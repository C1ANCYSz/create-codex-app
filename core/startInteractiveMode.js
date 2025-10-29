

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import readline from "readline";

import { pascalCase } from "change-case";

 
 export default function startInteractiveMode(targetDir, templatesDir, moduleTemplateDir) {
    console.log(chalk.cyanBright("\n🛠️  Enter interactive mode. Type a module name to generate a module.\n"));
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "> " });
    rl.prompt();

    rl.on("line", async (line) => {
      const trimmed = line.trim();
      let moduleNameRaw = null;
      const createMatch = /^create\s+(\w+)\s+module$/i.exec(trimmed);
      if (createMatch) moduleNameRaw = createMatch[1];
      else if (/^\w+$/.test(trimmed)) moduleNameRaw = trimmed;

      if (moduleNameRaw) {
        const moduleName = pascalCase(moduleNameRaw);
        const moduleDir = path.join(targetDir, "src", "modules", moduleNameRaw.toLowerCase());

        if (fs.existsSync(moduleDir)) console.log(chalk.red(`❌ Module "${moduleNameRaw}" already exists.`));
        else {
          await fs.mkdirp(moduleDir);
          try {
            const templateFiles = await fs.readdir(moduleTemplateDir);
            for (const file of templateFiles) {
              const ext = path.extname(file);
              let base = path.basename(file, ext);
              if (base.endsWith(".ts")) base = base.slice(0, -3);
              const newName = base.toLowerCase() === "index" ? "index.ts" : `${moduleName}.${base}.ts`;

              let content = await fs.readFile(path.join(moduleTemplateDir, file), "utf-8");
              content = content.replace(/{{ModuleName}}/g, moduleName);
              await fs.writeFile(path.join(moduleDir, newName), content, "utf-8");
            }

const appTsPath = path.join(targetDir, "app.ts");
const importName = `${moduleName}Module`;
const importPath = `./src/modules/${moduleNameRaw.toLowerCase()}/index.ts`;
const importLine = `import ${importName} from '${importPath}';\n`;

let currentContent = await fs.readFile(appTsPath, "utf-8");

if (!currentContent.includes(importLine)) {
  const lines = currentContent.split("\n");
  // Find the last line that starts with 'import'
  let lastImportIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("import")) lastImportIndex = i;
  }

  // Insert after the last import, or at top if none found
  const insertIndex = lastImportIndex + 1;
  lines.splice(insertIndex, 0, importLine.trim());
  currentContent = lines.join("\n");

  await fs.writeFile(appTsPath, currentContent, "utf-8");
}



            console.log(chalk.green(`✅ Module "${moduleNameRaw}" created successfully under src/modules.`));
          } catch (err) { console.error(chalk.red("❌ Failed to generate module:"), err); }
        }
      } else if (trimmed === "exit") rl.close();
      else console.log(chalk.yellow("⚠️  Unknown command. Type a module name or 'exit'."));

      rl.prompt();
    }).on("close", () => { console.log(chalk.cyan("\n👋 Goodbye!")); process.exit(0); });
  }