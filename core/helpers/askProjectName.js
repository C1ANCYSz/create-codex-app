import inquirer from 'inquirer';

async function askProjectName(argvName) {
  if (argvName) return argvName;
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter your project name:',
      default: 'my-codex-app',
    },
  ]);
  return name;
}

export default askProjectName;
