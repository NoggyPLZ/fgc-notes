import { prisma } from "@/lib/db";
import { Character, NoteCategory } from "@prisma/client";
import { NoteWithUserSafe } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth";
import NoteCategorySection from "./NoteCategorySection";
import NoteSearchResults from "./NoteSearchResults";

export default async function NoteSection({
  characterId,
  characterList,
  filter,
  query,
  tab,
  opponent,
  game,
}: {
  characterId: string;
  characterList: Character[];
  filter?: string;
  query?: string;
  tab?: string;
  opponent?: string;
  game: string;
}) {
  //Check for current user
  const user = await getCurrentUser();
  if (!user) {
    return <div>user not found</div>;
  }
  // if (query) {
  //   console.log(decodeURIComponent(query));
  // }

  //Get notes from db
  const notes = await prisma.character.findUnique({
    where: {
      slug: characterId,
    },
    include: {
      notesAsMain: {
        where: {
          ...(filter === "USER"
            ? {
                OR: [
                  { userId: user.id },
                  {
                    votes: {
                      some: {
                        userId: user.id,
                        value: 1,
                      },
                    },
                  },
                ],
              }
            : {}),
          ...(query
            ? {
                content: {
                  contains: decodeURIComponent(query),
                },
              }
            : {}),
        },
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

  const cat = tab ? tab : "NEUTRAL";

  return (
    <>
      {query ? (
        <div className="flex flex-wrap bg-gray-200 dark:bg-gray-800 border-l-10 border-l-rose-500 p-5 shadow-xl">
          <h1 className="text-4xl font-bold">
            Search Results for:{" "}
            <span className="font-medium italic">{query}</span>
          </h1>
          {category.map((cat, i) => (
            <div key={i} className="w-full">
              <NoteSearchResults
                category={cat}
                notes={grouped[cat] ?? []}
                characterList={characterList}
                voteSums={voteSums}
                currentUserId={user?.id}
                verified={user?.verified}
                role={user?.role}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap bg-gray-200 dark:bg-gray-800 border-l-10 border-l-rose-500 p-5 shadow-xl mb-20">
          <NoteCategorySection
            tab={cat}
            notes={grouped[cat] ?? []}
            opponent={opponent}
            characterList={characterList}
            voteSums={voteSums}
            currentUserId={user?.id}
            verified={user?.verified}
            role={user?.role}
            game={game}
          />
        </div>
      )}
    </>
  );
}
