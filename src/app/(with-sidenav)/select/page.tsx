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
      <h1 className="text-5xl md:text-8xl text-rose-600 font-black">
        Game Select
      </h1>
      <div className="flex md:flex-row flex-col">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex flex-col gap-5 p-5 justify-center items-center"
          >
            <Link href={`select/${game.slug}/`}>
              <div
                style={{
                  backgroundImage: `url(/bg-images/${game.slug}-bg.webp)`,
                }}
                className="flex flex-col basis-1/2 md:basis-1/6 bg-neutral-900 dark:bg-gray-800 rounded-2xl  h-full p-5 shadow-sm border-transparent hover:border-rose-500 border-4 bg-center bg-size-[auto_300px]"
              >
                <img
                  src={`/logos/${game.slug}-logo.webp`}
                  width={300}
                  height={300}
                  alt={`Logo for ${game.name}`}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
