"use client";

import { NoteWithUserSafe } from "@/lib/types";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import EditNoteForm from "../forms/note/EditNoteForm";

export default function EditNote({ note }: { note: NoteWithUserSafe }) {
  const [editToggle, setEditToggle] = useState(false);

  return (
    <>
      <button
        onClick={() => setEditToggle((prev) => !prev)}
        className={`cursor-pointer rounded-md p-1 text-gray-200 bg-blue-500 hover:bg-blue-600 ml-3`}
      >
        <SquarePen size={15} />
      </button>
      {editToggle && (
        <EditNoteForm note={note} onSuccess={() => setEditToggle(false)} />
      )}
    </>
  );
}
