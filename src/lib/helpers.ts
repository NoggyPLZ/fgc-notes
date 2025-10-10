"use server";

import { prisma } from "@/lib/db";
import { NoteWithUserSafe } from "./types";
import { getCurrentUser } from "./auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function deleteNote(noteId: NoteWithUserSafe) {
  console.log("DELETING NOTE...");
  const user = await getCurrentUser();

  const authorized = user?.id === noteId.userId || user?.role === "ADMIN";

  if (!authorized) {
    return;
  }

  const noteForPath = await prisma.note.findUnique({
    where: {
      id: noteId.id,
    },
    select: {
      Character: {
        select: {
          slug: true,
          Game: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!noteForPath) {
    console.log("No note found...");
  }
  try {
    await prisma.note.delete({
      where: {
        id: noteId.id,
      },
    });
    console.log("NOTE DELETED.");
    revalidatePath(
      `/select/${noteForPath?.Character.slug}/${noteForPath?.Character.Game.slug}`
    );
  } catch (error) {
    console.log("Deleting note failed: ", error);
  }
}

export async function verificationProcess(verifyId: string): Promise<{
  success: boolean;
  message: string;
}> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      message: "No user logged in.",
    };
  }

  const verificationEntry = await prisma.verfication.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!verificationEntry) {
    return {
      success: false,
      message: "No verification entry found",
    };
  }

  const isMatch = await bcrypt.compare(verifyId, verificationEntry.token);

  if (!isMatch) {
    return {
      success: false,
      message: "Verification entry is invalid or expired",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });
    await prisma.verfication.delete({
      where: {
        userId: user.id,
      },
    });
    return {
      success: true,
      message: "Successfully verified!",
    };
  } catch (error) {
    console.log("Verification process failed: ", error);
    return {
      success: false,
      message: `Verification failed ${error}`,
    };
  }
}
