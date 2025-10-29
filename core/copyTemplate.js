
import fs from "fs-extra";
import path from "path";


export default async function copyTemplate(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;
    if (entry.isFile() && destName.endsWith(".ts.template")) {
      destName = destName.replace(/\.ts\.template$/, ".ts");
    }
      if (entry.isFile() && destName.endsWith(".json.template")) {
      destName = destName.replace(/\.json\.template$/, ".json");
    }
    const destPath = path.join(dest, destName);
    if (entry.isDirectory()) {
      await fs.mkdirp(destPath);
      await copyTemplate(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}