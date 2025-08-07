import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function GameSelect() {
  const games = await prisma.game.findMany({
    include: {
      characters: true,
    },
  });
  return (
    <div>
      <h1>Game Select</h1>
      <div>
        {games.map((game) => (
          <div key={game.id} className="flex flex-col gap-5 p-5">
            <h2>{game.name}</h2>
            {game.characters.length > 0 ? (
              <ul>
                {game.characters.map((character) => (
                  <li key={character.id}>
                    <Link href={`select/${character.id}/`}>
                      {character.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              "no characters found"
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
