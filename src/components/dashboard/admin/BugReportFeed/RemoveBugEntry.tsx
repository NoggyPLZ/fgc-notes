"use client";

import { removeBug } from "@/actions/actions";
import { BugReport } from "@prisma/client";
import { useActionState } from "react";

export default function RemoveBugEntry({ report }: { report: BugReport }) {
  const [state, removeBugAction, pending] = useActionState(
    removeBug,
    undefined
  );

  const { id } = report;

  return (
    <form action={removeBugAction}>
      <input type="hidden" name="reportId" value={id} />
      <button
        className="text-sm py-1 px-2 bg-rose-500 rounded-md hover:bg-rose-700 cursor-pointer"
        type="submit"
        disabled={pending}
      >
        clear
      </button>
    </form>
  );
}
