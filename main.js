#!/usr/bin/env node

import { question } from "./lib/question.js";
import { initEnv } from "./lib/initEnv.js";

export async function init (isDefault) {
    let questions = null;
    
    if (!isDefault) {
      questions = await question(process.cwd());
    }
    
    initEnv(questions, process.cwd());
}


