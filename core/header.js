import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';

function printHeader() {
  const header = figlet.textSync('Codex JS', {
    font: 'ANSI Shadow',
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
      borderStyle: 'round',
      borderColor: 'cyan',
      backgroundColor: '#1a1a2e',
    })
  );
}

export default printHeader;
