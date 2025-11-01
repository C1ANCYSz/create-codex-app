import chalk from 'chalk';

function showNextSteps(name) {
  console.log(chalk.white('Next steps:'));
  console.log(chalk.cyan(`  cd ${name}`));
  console.log(chalk.cyan('  npm run dev\n'));
}

export default showNextSteps;
