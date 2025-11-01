import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import copyTemplate from '../copyTemplate.js';

async function askForNewName(name) {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'newName',
      message: chalk.red(
        `Folder "${name}" already exists. Enter a new project name:`
      ),
      default: `${name}-new`,
    },
  ]);
  return answer.newName;
}

async function createProjectDir(name, targetDir, templatesDir, pkg) {
  // Loop until a valid, unused directory name is chosen
  while (fs.existsSync(targetDir)) {
    name = await askForNewName(name);
    targetDir = path.resolve(process.cwd(), name);
  }

  console.log(chalk.gray(`\n📂 Creating project in ${targetDir}...\n`));
  await fs.mkdirp(targetDir);

  try {
    await copyTemplate(templatesDir, targetDir);
    await fs.writeJson(path.join(targetDir, 'package.json'), pkg, {
      spaces: 2,
    });
  } catch (err) {
    console.error(chalk.red('❌ Failed to create project:'), err);
    process.exit(1);
  }

  console.log(chalk.greenBright(`\n✅ ${name} created successfully!\n`));
}

export default createProjectDir;
