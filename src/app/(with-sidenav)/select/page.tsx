import { prisma } from "@/lib/db";
import Image from "next/image";
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
              <div className="flex flex-col basis-1/2 md:basis-1/6 bg-gray-200 dark:bg-gray-800 rounded-2xl  h-full p-5 shadow-sm hover:bg-rose-700">
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
