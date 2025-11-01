#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import os from 'os';

// core modules
import startInteractiveMode from '../core/startInteractiveMode.js';
import createPkg from '../core/createPkg.js';
import printHeader from '../core/header.js';
import showNextSteps from '../core/helpers/showNextSteps.js';

//HELPERS
import askProjectName from '../core/helpers/askProjectName.js';
import createProjectDir from '../core/helpers/createProjectDir.js';
import installDependencies from '../core/helpers/installDependencies.js';

// CONSTANTS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, '../templates/ts');
const moduleTemplateDir = path.join(__dirname, '../templates/module');

async function main() {
  printHeader();

  const argvName = process.argv[2];
  const name = await askProjectName(argvName);
  const targetDir = path.resolve(process.cwd(), name);
  const pkg = createPkg(name);

  await createProjectDir(name, targetDir, templatesDir, pkg);
  await installDependencies(targetDir);

  showNextSteps(name);
  startInteractiveMode(targetDir, templatesDir, moduleTemplateDir);
}

main().catch((err) => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
});
