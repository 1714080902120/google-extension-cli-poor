#!/usr/bin/env node

import { question } from "../lib/question.js";
import { initEnv } from "../lib/initEnv.js";

const args = process.argv.slice(2);

let questions = null;

if (args.indexOf("--default") === -1) {
  questions = await question(process.cwd());
}

initEnv(questions, process.cwd());
