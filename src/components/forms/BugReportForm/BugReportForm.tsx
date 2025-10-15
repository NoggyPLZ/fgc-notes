"use client";

import { reportBugForm } from "@/actions/actions";
import Button from "@/components/ui/Button";
import { useActionState } from "react";

export default function BugReportForm() {
  const [state, reportBugAction, pending] = useActionState(
    reportBugForm,
    undefined
  );
  return (
    <div>
      {state?.success && <p>good job</p>}
      <form action={reportBugAction} className="flex flex-col gap-5 pt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-semibold">
            Category:
          </label>
          <select
            name="category"
            className="border-1 border-gray-300 rounded-2xl p-3 dark:bg-neutral-950 bg-gray-100"
          >
            <option defaultValue="UI">Layout Issues, broken styles</option>
            <option value="UX">Confusing flows, unclear about something</option>
            <option value="PERFORMANCE">Lag, slowness, load times</option>
            <option value="FUNCTIONALITY">Feature not working</option>
            <option value="DATA">Missing or Inconsisitent Data</option>
            <option value="AUTH">Login/Logout/Session issues</option>
            <option value="NETWORK">Errors instead of data</option>
            <option value="ACCESSIBILITY">a11y concerns, accessibility</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-semibold">
            Report Information:
          </label>
          <textarea
            name="content"
            rows={5}
            className="border-1 border-gray-300 rounded-2xl p-3 focus:outline-rose-600 focus:outline-1 bg-gray-100 dark:bg-neutral-950 focus:border-transparent"
          />
        </div>
        <Button type="submit" style="primary" disabled={pending}>
          Submit Report
        </Button>
      </form>
    </div>
  );
}
