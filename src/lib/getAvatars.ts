import fs from "fs";
import path from "path";

export function getAvatars() {
  const baseDir = path.join(process.cwd(), "public/character-icons");
  const gameDirs = fs.readdirSync(baseDir, { withFileTypes: true });
  const avatarsByGame: Record<string, string[]> = {};

  for (const dirent of gameDirs) {
    if (dirent.isDirectory()) {
      const gameSlug = dirent.name;
      const gameDir = path.join(baseDir, gameSlug);
      const files = fs
        .readdirSync(gameDir)
        .filter((file) => file.endsWith(".webp"));

      avatarsByGame[gameSlug].map(
        (file) => `character-icons/${gameSlug}/${file}`
      );
    }
  }

  return avatarsByGame;
}
