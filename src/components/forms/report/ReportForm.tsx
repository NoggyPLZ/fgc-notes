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
        className="dark:bg-neutral-950 border-b-3 border-gray-400  p-4 bg-neutral-100 border-b-rose-500 text-rose-500 dark:text-gray-100 font-bold"
        name="reason"
        defaultValue="harrassment"
      >
        <option value="harrassment">Harrassment</option>
        <option value="racism">Racism/Bigotry</option>
        <option value="sexual">Sexual Violence</option>
      </select>
      {state?.errors.reason && <p>{state.errors.reason}</p>}
      <label htmlFor="info" className="font-semibold">
        Additional Info:
      </label>
      <input
        name="info"
        className="border-b-3 border-b-rose-500 border-gray-400 p-5 field-sizing-content bg-gray-100 focus:outline-rose-600 focus:outline-1 outline-transparent outline-1 dark:bg-neutral-950 caret-rose-500"
      />
      {state?.errors.info && <p>{state.errors.info}</p>}
      <Button type="submit" style="primary" disabled={pending}>
        Submit
      </Button>
    </form>
  );
}
