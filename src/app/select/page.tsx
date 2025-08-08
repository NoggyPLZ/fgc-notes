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
            <h2>
              <Link href={`select/${game.slug}/`}>{game.name}</Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
