import NoteSection from "@/components/character/NoteSection";
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

  const latestNote = await prisma.note.findFirst({
    where: {
      Character: {
        slug: characterId,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const characterList = game.characters;

  const characterChoice = game.characters.find(
    (char) => char.slug === characterId
  );

  if (!characterChoice) {
    return <div>no character found</div>;
  }

  return (
    <div>
      <h1 className="text-5xl font-black mb-5">
        {characterChoice && characterChoice.name}
      </h1>
      <NoteSection characterId={characterId} characterList={characterList} />
      <div>
        <NoteForm
          key={latestNote?.id}
          characterList={characterList}
          mainCharacter={characterChoice}
          game={game.slug}
          latestCategory={latestNote?.category}
          latestOpponent={latestNote?.opponentId}
        />
      </div>
    </div>
  );
}
