"use client";

import { NoteWithUserSafe } from "@/lib/types";
import Button from "@/components/ui/Button";
import { editSubmit } from "@/actions/actions";
import { useActionState, useEffect } from "react";

export default function EditNoteForm({
  note,
  onSuccess,
}: {
  note: NoteWithUserSafe;
  onSuccess: () => void;
}) {
  const [state, editNoteAction, pending] = useActionState(
    editSubmit,
    undefined
  );

  const content = note.content;

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state?.success, onSuccess]);

  return (
    <form action={editNoteAction} className="flex flex-col gap-2 py-2">
      <input type="hidden" name="id" value={note.id} />
      <textarea
        name="content"
        className="border-1 border-gray-400 rounded-2xl p-3 w-full min-h-40 field-sizing-content"
        placeholder={content}
        defaultValue={content}
        required
        minLength={5}
        maxLength={1000}
      />
      {state?.errors.content && (
        <p className="text-red-500">{state.errors.content}</p>
      )}
      <div>
        <Button style={"primary"} type="submit" disabled={pending}>
          Submit
        </Button>
      </div>
    </form>
  );
}
