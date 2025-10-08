"use client";
import { reportNote } from "@/actions/actions";
import Button from "@/components/ui/Button";
import { NoteWithUserSafe } from "@/lib/types";
import { useActionState, useEffect } from "react";

export default function ReportForm({
  note,
  clickHandler,
}: {
  note: NoteWithUserSafe;
  clickHandler: () => void;
}) {
  const [state, reportAction, pending] = useActionState(reportNote, undefined);

  useEffect(() => {
    if (state?.success) {
      clickHandler();
    }
  }, [state?.success, clickHandler]);

  return (
    <form action={reportAction} className="flex flex-col gap-3">
      <input name="noteId" type="hidden" value={note.id} />
      <label htmlFor="reason" className="font-semibold">
        Reason for Report
      </label>
      <select
        className="border-1 border-gray-300 rounded-2xl p-3 dark:bg-gray-800 bg-gray-100"
        name="reason"
      >
        <option defaultValue="harrassment">Harrassment</option>
        <option value="racism">Racism/Bigotry</option>
        <option value="sexual">Sexual Violence</option>
      </select>
      <label htmlFor="info" className="font-semibold">
        Additional Info:
      </label>
      <input
        name="info"
        className="border-1 border-gray-300 rounded-2xl p-3 focus:outline-rose-600 focus:outline-1"
      />
      {state?.errors.info && <p>{state.errors.info}</p>}
      <Button type="submit" style="primary" disabled={pending}>
        Submit
      </Button>
    </form>
  );
}
