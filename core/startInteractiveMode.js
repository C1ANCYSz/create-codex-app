import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import readline from 'readline';
import { pascalCase } from 'change-case';

/**
 * Interactive CLI that lets user create modules dynamically
 * based on /templates/module/*.ts.template files.
 */
export default function startInteractiveMode(
  targetDir,
  templatesDir,
  moduleTemplateDir
) {
  console.log(
    chalk.cyanBright(
      '\n🛠️  Enter interactive mode. Type a module name to generate a module.\n'
    )
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const trimmed = line.trim();

    // Support commands like: "create user module" OR just "user"
    const createMatch = /^create\s+(\w+)\s+module$/i.exec(trimmed);
    const moduleNameRaw = createMatch
      ? createMatch[1]
      : /^\w+$/.test(trimmed)
      ? trimmed
      : null;

    if (moduleNameRaw) {
      const moduleName = pascalCase(moduleNameRaw);
      const moduleDir = path.join(
        targetDir,
        'src',
        'modules',
        moduleNameRaw.toLowerCase()
      );

      // Prevent overwriting
      if (fs.existsSync(moduleDir)) {
        console.log(chalk.red(`❌ Module "${moduleNameRaw}" already exists.`));
        rl.prompt();
        return;
      }

      try {
        await fs.mkdirp(moduleDir);

        // Copy each .template file
        const templateFiles = await fs.readdir(moduleTemplateDir);

        for (const file of templateFiles) {
          const ext = path.extname(file);
          const base = path.basename(file, ext).replace('.ts', '');

          // Only handle .template files
          if (!file.endsWith('.template')) continue;

          const newName =
            base.toLowerCase() === 'index'
              ? 'index.ts'
              : `${moduleName}.${base}.ts`;

          let content = await fs.readFile(
            path.join(moduleTemplateDir, file),
            'utf-8'
          );

          // Replace placeholders like {{ModuleName}}
          content = content.replace(/{{ModuleName}}/g, moduleName);

          await fs.writeFile(path.join(moduleDir, newName), content, 'utf-8');
        }

        // Inject module import into src/app.ts
        const appTsPath = path.join(targetDir, 'src', 'app.ts');
        if (await fs.pathExists(appTsPath)) {
          let appContent = await fs.readFile(appTsPath, 'utf-8');
          const importName = `${moduleName}Module`;
          const importPath = `./modules/${moduleNameRaw.toLowerCase()}/index.js`;
          const importLine = `import ${importName} from '${importPath}';`;

          if (!appContent.includes(importLine)) {
            const lines = appContent.split('\n');
            let lastImportIndex = -1;

            for (let i = 0; i < lines.length; i++) {
              if (lines[i].startsWith('import')) lastImportIndex = i;
            }

            // Insert import right after the last import statement
            lines.splice(lastImportIndex + 1, 0, importLine);
            appContent = lines.join('\n');
            await fs.writeFile(appTsPath, appContent, 'utf-8');
          }
        }

        console.log(
          chalk.green(
            `✅ Module "${moduleNameRaw}" created successfully under src/modules/`
          )
        );
      } catch (err) {
        console.error(chalk.red('❌ Failed to generate module:'), err);
      }
    } else if (trimmed === 'exit') {
      rl.close();
      return;
    } else {
      console.log(
        chalk.yellow("⚠️  Unknown command. Type a module name or 'exit'.")
      );
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log(chalk.cyan('\n👋 Goodbye!'));
    process.exit(0);
  });
}
