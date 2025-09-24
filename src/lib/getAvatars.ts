import fs from "fs";
import path from "path";

export function getAvatars() {
  const dir = path.join(process.cwd(), "public/character-icons");
  return fs.readdirSync(dir).map((file) => `character-icons/${file}`);
}
