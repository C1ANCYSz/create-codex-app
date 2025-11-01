import { exec } from 'child_process';
import chalk from 'chalk';
import os from 'os';

const npmCmd = os.platform() === 'win32' ? 'npm.cmd' : 'npm';

function installDependencies(targetDir) {
  console.log(
    chalk.yellow(
      '\n📦 Installing dependencies... This may take a few seconds.\n'
    )
  );

  const command = [
    `${npmCmd} install dotenv @codex-js/core`,
    `${npmCmd} install -D @types/express @types/node nodemon tsx typescript`,
  ].join(' && ');

  return new Promise((resolve, reject) => {
    exec(
      command,
      { cwd: targetDir, maxBuffer: 1024 * 1024 * 10 },
      (err, stdout, stderr) => {
        if (err) {
          console.error(chalk.red(`❌ npm install failed:`));
          console.error(stderr || err.message);
          reject(err);
        } else {
          console.log(stdout);
          console.log(
            chalk.greenBright('\n✅ Dependencies installed successfully!\n')
          );
          resolve();
        }
      }
    );
  });
}

export default installDependencies;
