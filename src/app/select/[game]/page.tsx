import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function CharacterSelect({
  params,
}: {
  params: { game: string };
}) {
  const { game: gameId } = await params;
  const game = await prisma.game.findUnique({
    where: {
      slug: gameId,
    },
    include: {
      characters: true,
    },
  });

  if (!game) return <div>Game not Found</div>;

  return (
    <div>
      <h1>Character Select</h1>
      <ul>
        {game.characters.map((character) => (
          <li key={character.id}>
            <Link href={`/select/${game.slug}/${character.slug}`}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
