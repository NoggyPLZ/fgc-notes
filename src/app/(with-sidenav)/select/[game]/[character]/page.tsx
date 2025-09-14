import NoteModal from "@/components/character/noteModal/NoteModal";
import NoteSection from "@/components/character/NoteSection";
import NoteForm from "@/components/forms/note/NoteForm";
import { prisma } from "@/lib/db";
import Image from "next/image";

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
      <div className="flex flex-col md:flex-row gap-2 pb-5">
        <Image
          src={`/character-icons/${characterChoice.name.toLocaleLowerCase()}-sml.webp`}
          alt={`Character portrait of ${characterChoice.name}`}
          width={200}
          height={200}
          className="rounded-2xl"
        />
        <h1 className="text-5xl font-black mb-5">
          {characterChoice && characterChoice.name}
        </h1>
      </div>
      <NoteSection characterId={characterId} characterList={characterList} />
      <NoteModal>
        <NoteForm
          key={latestNote?.id}
          characterList={characterList}
          mainCharacter={characterChoice}
          game={game.slug}
          latestCategory={latestNote?.category}
          latestOpponent={latestNote?.opponentId}
        />
      </NoteModal>
      <div>
        {/* <NoteForm
          key={latestNote?.id}
          characterList={characterList}
          mainCharacter={characterChoice}
          game={game.slug}
          latestCategory={latestNote?.category}
          latestOpponent={latestNote?.opponentId}
        /> */}
      </div>
    </div>
  );
}
