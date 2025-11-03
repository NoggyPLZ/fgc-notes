import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function CharacterSelect({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game: gameId } = await params;
  const game = await prisma.game.findUnique({
    where: {
      slug: gameId,
    },
    include: {
      characters: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!game) return <div>Game not Found</div>;

  return (
    <div>
      <h1 className="text-5xl md:text-8xl text-rose-600 font-black">
        Character Select
      </h1>
      <div className="flex flex-row flex-wrap gap-5 pt-5">
        {game.characters.map((character) => (
          <div
            key={character.id}
            className="relative group bg-neutral-800 rounded-2xl hover:bg-rose-800"
          >
            <Link href={`/select/${game.slug}/${character.slug}`}>
              <img
                src={
                  character.avatarUrl
                    ? `/character-icons/${character.avatarUrl.toLocaleLowerCase()}-sml.webp`
                    : `/profile-image-placeholder.gif`
                }
                className="rounded-2xl"
                width={200}
                height={200}
                alt={`Character portraite for ${character.name} that links to the page for ${character.name}`}
              />
              <h4 className="absolute bottom-0 text-2xl font-black bg-gray-800 group-hover:bg-rose-500 text-gray-100 px-2">
                {character.name}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
