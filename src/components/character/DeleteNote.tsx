"use client";
import { deleteNote } from "@/lib/helpers";
import { NoteWithUserSafe } from "@/lib/types";
import { LucideTrash } from "lucide-react";

export default function DeleteNote({ note }: { note: NoteWithUserSafe }) {
  return (
    <button
      onClick={() => deleteNote(note)}
      className={`cursor-pointer  rounded-md p-1 text-gray-200 bg-red-500 hover:bg-red-600 }`}
    >
      <LucideTrash size={15} />
    </button>
  );
}
