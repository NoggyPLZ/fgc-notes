"use client";
import { deleteNote } from "@/actions/actions";
import { NoteWithUserSafe } from "@/lib/types";
import { Loader2, LucideTrash } from "lucide-react";
import { useTransition } from "react";

export default function DeleteNote({ note }: { note: NoteWithUserSafe }) {
  const [isPending, startTransition] = useTransition();

  const deleteHandler = (note: NoteWithUserSafe) => {
    startTransition(async () => {
      deleteNote(note);
    });
  };
  return (
    <button
      onClick={() => deleteHandler(note)}
      className={`rounded-md p-1 text-gray-200 ${
        isPending ? "bg-gray-500" : "bg-red-500 hover:bg-red-600 cursor-pointer"
      } `}
    >
      {isPending ? (
        <Loader2 size={15} className="animate-spin-slow" />
      ) : (
        <LucideTrash size={15} />
      )}
    </button>
  );
}
