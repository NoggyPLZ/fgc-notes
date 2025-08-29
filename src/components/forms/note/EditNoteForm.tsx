"use client";

import { NoteWithUserSafe } from "@/lib/types";
import Button from "@/components/ui/Button";
import { useActionState } from "react";
import { editSubmit } from "@/actions/actions";

export default function EditNoteForm({
  note,
  onSuccess,
}: {
  note: NoteWithUserSafe;
  onSuccess: () => void;
}) {
  const [state, editSubmitAction] = useActionState(editSubmit, undefined);
  const content = note.content;

  return (
    <form
      action={async (formData) => {
        await editSubmitAction(formData);
        if (!state?.errors) {
          onSuccess();
        }
      }}
      className="flex flex-col gap-2 py-2"
    >
      <input type="hidden" name="id" value={note.id} />
      <input
        name="content"
        className="border-1 border-gray-400 rounded-2xl p-3 w-full"
        placeholder={content}
        defaultValue={content}
      />
      <div>
        <Button style={"primary"} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
