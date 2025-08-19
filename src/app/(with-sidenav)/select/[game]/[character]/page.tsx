import NoteForm from "@/components/forms/note/NoteForm";
import { prisma } from "@/lib/db";

export default async function CharacterPage({
  params,
}: {
  params: { game: string; character: string };
}) {
  const { game: gameId, character: characterId } = await params;
  const game = await prisma.game.findUnique({
    where: {
      slug: gameId,
    },
    include: {
      characters: true,
    },
  });
  if (!game) {
    return <div>no game found</div>;
  }

  const characterList = game.characters;

  const characterChoice = game.characters.find(
    (char) => char.slug === characterId
  );

  if (!characterChoice) {
    return <div>no character found</div>;
  }

  return (
    <div>
      <h1 className="text-5xl font-black">
        {characterChoice && characterChoice.name}
      </h1>
      <div>
        <NoteForm
          characterList={characterList}
          mainCharacter={characterChoice}
        />
      </div>
    </div>
  );
}
