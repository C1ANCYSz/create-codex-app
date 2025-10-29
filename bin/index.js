#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet'; // <-- for ASCII art
import boxen from 'boxen'; // <-- for a nice boxed look
import { fileURLToPath } from 'url';

// core
import startInteractiveMode from '../core/startInteractiveMode.js';
import createPkg from '../core/createPkg.js';
import copyTemplate from '../core/copyTemplate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.join(__dirname, '../templates/ts');
const moduleTemplateDir = path.join(__dirname, '../templates/module');

// Fancy header
function printHeader() {
  const header = figlet.textSync('Codex JS', {
    font: 'ANSI Shadow', // More dramatic and modern
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });

  const tagline = chalk.yellow.bold(
    'Documentation: https://github.com/C1ANCYSz/CodexJS'
  );
  const separator = chalk.dim('─'.repeat(50));

  const content = [
    chalk.cyan.bold(header),
    '',
    separator,
    tagline,
    separator,
  ].join('\n');

  console.log(
    boxen(content, {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 2, right: 2 },
      borderStyle: 'round', // Softer, more modern look
      borderColor: 'cyan',
      backgroundColor: '#1a1a2e', // Dark background for contrast
    })
  );
}

async function main() {
  printHeader();

  const argvName = process.argv[2];
  const { name } = argvName
    ? { name: argvName }
    : await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter your project name:',
          default: 'my-codex-app',
        },
      ]);

  const pkg = createPkg(name);
  const targetDir = path.resolve(process.cwd(), name);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`❌ Folder "${name}" already exists.`));
    process.exit(1);
  }

  console.log(chalk.gray(`\n📂 Creating project in ${targetDir}...\n`));

  await fs.mkdirp(targetDir);

  try {
    await copyTemplate(templatesDir, targetDir);
  } catch (err) {
    console.error(chalk.red('❌ Failed to copy template:'), err);
    process.exit(1);
  }

  await fs.writeJson(path.join(targetDir, 'package.json'), pkg, { spaces: 2 });

  console.log(
    chalk.greenBright(`\n✅ ${name} created successfully with TypeScript!\n`)
  );
  console.log(
    chalk.yellow(
      '\n📦 Installing dependencies... This may take a few seconds.\n'
    )
  );

  exec('npm install', { cwd: targetDir }, (err, stdout) => {
    if (err)
      console.error(chalk.red('❌ Failed to install dependencies:'), err);
    else {
      console.log(stdout);
      console.log(
        chalk.greenBright('\n✅ Dependencies installed successfully!\n')
      );
      console.log(chalk.white(`Next steps:\ncd ${name}\nnpm run dev\n`));

      startInteractiveMode(targetDir, templatesDir, moduleTemplateDir);
    }
  });
}

main().catch((err) => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
});
