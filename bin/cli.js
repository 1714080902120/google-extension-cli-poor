#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { init } from '../main.js'


const program = new Command();

program.name('google-extension-cli-poor')
.description('a poor cli for google extension')
.version('1.0.2')
.option('-d, --default', 'quickly create a default project which google extension official provide')
.action(async(options) => {
  try {
    await init(options.default)
    console.log(chalk.green('create success !'))
  } catch (error) {
    console.log(chalk.red(`create error: ${error}`))
  }
})

program.command('c-goo-ext').description('create google extension')

program.parse(process.argv);

