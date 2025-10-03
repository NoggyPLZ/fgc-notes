import NoteModal from "@/components/character/noteModal/NoteModal";
import NoteOptionsContainer from "@/components/character/NoteOptionsContainer";
import NoteSection from "@/components/character/NoteSection";
import NoteForm from "@/components/forms/note/NoteForm";
import { prisma } from "@/lib/db";
import Image from "next/image";

export default async function CharacterPage({
  params,
  searchParams,
}: {
  params: Promise<{ game: string; character: string }>;
  searchParams?: Promise<{ filter?: string; query?: string }>;
}) {
  const { game: gameId, character: characterId } = await params;
  const filterSearch = await searchParams;

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
    <div
      style={{
        backgroundImage: `url(/bg-images/${game.slug}-bg.webp)`,
      }}
      className="rounded-2xl bg-blend-multiply bg-cyan-500"
    >
      <div className="flex flex-col lg:flex-row gap-2 p-5">
        <Image
          src={`/character-icons/${characterChoice.name.toLocaleLowerCase()}-sml.webp`}
          alt={`Character portrait of ${characterChoice.name}`}
          width={200}
          height={200}
          className="rounded-2xl"
        />
        <div className="flex flex-col md:gap-4 text-gray-100 lg:w-[50%]">
          <h1 className="text-5xl font-black mb-5">
            {characterChoice && characterChoice.name}
          </h1>
          <p>{characterChoice.story}</p>
        </div>
      </div>
      <NoteOptionsContainer
        characterSlug={characterChoice.slug}
        gameSlug={game.slug}
        filter={filterSearch?.filter || "ALL"}
      />
      <NoteSection
        characterId={characterId}
        characterList={characterList}
        filter={filterSearch?.filter || "ALL"}
        query={filterSearch?.query}
      />
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
    </div>
  );
}
