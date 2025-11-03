"use server";

import { getCurrentUser } from "./auth";
import { prisma } from "./db";
import { Prisma } from "@prisma/client";

type GetNotesType = {
  filter: string;
  query: string;
  characterId: string;
};

type CharacterWithNotes = Prisma.CharacterGetPayload<{
  include: {
    notesAsMain: {
      where: any;
      include: {
        User: { select: { id: true; name: true } };
        votes: { where: any; select: { value: true } };
      };
    };
  };
}>;

export async function getNotes({
  filter,
  query,
  characterId,
}: GetNotesType): Promise<CharacterWithNotes | null> {
  const user = await getCurrentUser();
  if (!user) {
    console.log("No user logged in");
    return null;
  }

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

  return notes;
}

export async function getVotes(notes: CharacterWithNotes | null) {
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

  return voteSums;
}

type GameWithCharacters = Prisma.GameGetPayload<{
  include: {
    characters: true;
  };
}>;

export async function getGameWithCharacters(
  gameId: string
): Promise<GameWithCharacters | null> {
  const game = await prisma.game.findUnique({
    where: {
      slug: gameId,
    },
    include: {
      characters: true,
    },
  });

  if (!game) {
    return null;
  }

  return game;
}

export async function getLastestNote(characterId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const latestNote = await prisma.note.findFirst({
    where: {
      Character: {
        slug: characterId,
      },
      User: {
        id: user.id,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return latestNote;
}
