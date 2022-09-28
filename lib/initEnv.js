import { writeFileSync, mkdirSync, existsSync } from "fs";
import { manifestJsonStr } from "./template/manifest.js";
import { backgroundScriptStr } from "./template/background.js";
import {
  optionsPageHtmlStr,
  optionsPageJsStr,
} from "./template/optionsPage.js";
import { popupHtmlStr, popupJsStr, linkCssStr } from "./template/popup.js";
import { resolvePathWrap, fixFileNameSuffix } from "../utils.js";
import { basename } from "path";

let resolvePath = null;

export async function initEnv(questions, path) {
  try {
    if (!questions) {
      questions = initManifest(path);
    }
    resolvePath = resolvePathWrap(path);
    await writeManifestJson(questions);
    await mkImagesDir();
  } catch (error) {
    throw new Error(error);
  }
}

async function writeManifestJson(manifest) {
  let str = manifestJsonStr;

  const specificMap = {
    __backgroundScript: createBackgroundScript,
    __permissions: selectPermissions,
    __actionDefaultPopup: createPopup,
    __optionsPage: createOptionsPage,
  };

  for (const key in manifest) {
    if (Object.hasOwnProperty.call(manifest, key)) {
      const param = `__${key}`;
      const fn = specificMap[param];
      let element = manifest[key];
      if (fn) {
        element = await fn(element, manifest);
      }
      str = str.replace(param, element);
    }
  }

  writeFileSync(resolvePath("manifest.json"), str);
}

function mkImagesDir() {
  const path = resolvePath("images");
  if (existsSync(path)) {
    return;
  } else {
    mkdirSync(resolvePath("images"));
  }
}

function createBackgroundScript(filename) {
  filename = fixFileNameSuffix(filename);
  writeFileSync(resolvePath(filename), backgroundScriptStr);
  return filename;
}

function selectPermissions(selection, hash) {
  if (selection === "default") {
    return `["storage", "activeTab", "scripting"]`;
  } else {
    if (hash.customPermissions && hash.customPermissions.length > 0) {
      return `[${hash.customPermissions
        .split(" ")
        .reduce(
          (prev, current, i) => `${prev}${i === 0 ? "" : ", "}"${current}"`,
          ""
        )}]`;
    } else {
      return `[]`;
    }
  }
}

function createPopup(filename) {
  filename = fixFileNameSuffix(filename, "html");
  const jsName = filename.replace(".html", ".js");
  writeFileSync(
    resolvePath(filename),
    popupHtmlStr.replace("__popupJs", jsName)
  );
  writeFileSync(resolvePath(jsName), popupJsStr);
  writeFileSync(resolvePath("index.css"), linkCssStr);
  return filename;
}

function createOptionsPage(filename) {
  filename = fixFileNameSuffix(filename, "html");
  const jsName = filename.replace(".html", ".js");
  writeFileSync(
    resolvePath(filename),
    optionsPageHtmlStr.replace("__optionsJs", jsName)
  );
  writeFileSync(resolvePath(jsName), optionsPageJsStr);
  return filename;
}

function initManifest(path) {
  return {
    name: basename(path),
    description: "google extension",
    version: "1.0.0",
    manifest_version: 3,
    backgroundScript: "background.js",
    permissions: 'default',
    actionDefaultPopup: "popup.html",
    optionsPage: "options.html",
  };
}
