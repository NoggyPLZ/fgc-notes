"use client";

import { NoteWithUserSafe } from "@/lib/types";
import Button from "@/components/ui/Button";
import { editSubmit } from "@/actions/actions";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import NotationInputHelper from "./NotationInputHelper";

export default function EditNoteForm({
  note,
  onSuccess,
  game,
}: {
  note: NoteWithUserSafe;
  onSuccess: () => void;
  game: string;
}) {
  const [state, editNoteAction, pending] = useActionState(
    editSubmit,
    undefined,
  );

  const content = note.content;

  useEffect(() => {
    if (state?.success) {
      toast.success("Edit success!");
      onSuccess();
    }
  }, [state?.success, onSuccess]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const notationHelper = (symbol: string) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    textarea.value = value.slice(0, start) + symbol + value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + symbol.length;

    textarea.focus();
  };

  return (
    <form action={editNoteAction} className="flex flex-col gap-2 py-2">
      <input type="hidden" name="id" value={note.id} />
      <NotationInputHelper game={game} notationHelper={notationHelper} />
      <textarea
        name="content"
        className="border-1 border-gray-400 rounded-2xl p-3 w-full min-h-40 field-sizing-content"
        placeholder={content}
        defaultValue={content}
        required
        minLength={5}
        maxLength={1000}
        ref={textAreaRef}
      />
      {state?.errors.content && (
        <p className="text-red-500">{state.errors.content}</p>
      )}
      <div>
        <Button style={"primary"} type="submit" disabled={pending}>
          {pending ? `Submitting...` : `Submit`}
        </Button>
      </div>
    </form>
  );
}
