"use server";

import { prisma } from "@/lib/db";
import { NoteWithUserSafe } from "./types";

export async function deleteNote(noteId: NoteWithUserSafe) {
  console.log("DELETING NOTE...");
  try {
    await prisma.note.delete({
      where: {
        id: noteId.id,
      },
    });
    console.log("NOTE DELETED.");
  } catch (error) {
    console.log("Deleting note failed: ", error);
  }
}

export async function editNote(noteId: NoteWithUserSafe) {
  try {
  } catch (error) {}
}
