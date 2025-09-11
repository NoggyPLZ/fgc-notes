import { Note } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { Character, NoteCategory } from "@prisma/client";
import NoteByCategory from "./NoteByCategory";
import { NoteWithUserSafe } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth";

type NoteSectionProps = {
  category: NoteCategory;
  note: Note;
};

export default async function NoteSection({
  characterId,
  characterList,
}: {
  characterId: string;
  characterList: Character[];
}) {
  const user = await getCurrentUser();
  if (!user) {
    return <div>user not found</div>;
  }
  const notes = await prisma.character.findUnique({
    where: {
      slug: characterId,
    },
    include: {
      notesAsMain: {
        include: {
          User: {
            select: {
              id: true,
              name: true,
            },
          },
          votes: {
            where: { userId: user?.id },
            select: { value: true },
          },
        },
      },
    },
  });

  //console.log(notes?.notesAsMain[2].votes); //CONSOLE LOG TO DELETE AFTER DEV

  const noteIds = notes?.notesAsMain.map((note) => note.id);

  const voteSums = await prisma.votes.groupBy({
    by: ["noteId"],
    where: {
      noteId: {
        in: noteIds,
      },
    },
    _sum: {
      value: true,
    },
  });

  if (!notes) {
    return <div>no notes found</div>;
  }
  const category: NoteCategory[] = ["NEUTRAL", "COMBOS", "SETPLAY", "MATCHUPS"];

  const notesByCategory = (notesToSort: NoteWithUserSafe[]) => {
    const groupByCategory = notesToSort.reduce<
      Record<string, NoteWithUserSafe[]>
    >((acc, note) => {
      (acc[note.category] ||= []).push(note);
      return acc;
    }, {});

    for (const cat in groupByCategory) {
      groupByCategory[cat].sort((a, b) => b.rating - a.rating);
    }
    return groupByCategory;
  };

  const grouped = notesByCategory(notes.notesAsMain);

  return (
    <div className="flex flex-wrap bg-gray-200 dark:bg-gray-800 rounded-2xl p-5 shadow-xl">
      {category.map((cat, i) => (
        <div key={i} className={`${cat === "MATCHUPS" ? "w-full" : "w-full"}`}>
          <NoteByCategory
            category={cat}
            notes={grouped[cat] ?? []}
            characterList={characterList}
            voteSums={voteSums}
            currentUserId={user?.id}
            verified={user?.verified}
          />
        </div>
      ))}
    </div>
  );
}
