import { prisma } from "@/lib/db";

export default async function CharacterPage({
  params,
}: {
  params: { character: string };
}) {
  const { character: characterId } = await params;
  const character = await prisma.character.findUnique({
    where: {
      slug: characterId,
    },
  });

  if (!character) {
    return <div>Character not found.</div>;
  }
  return (
    <div>
      <h1>Character Page</h1>
      <h2>{character.name}</h2>
    </div>
  );
}
