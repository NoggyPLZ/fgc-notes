import { BugReport } from "@prisma/client";
import RemoveBugEntry from "./RemoveBugEntry";

type BugReportWithUser = BugReport & {
  user: {
    name: string;
  };
};

export default function BugEntry({ report }: { report: BugReportWithUser }) {
  const { content, status, user, category } = report;
  return (
    <div className="flex flex-col gap-2 pt-5">
      <div className="grid grid-cols-12 divide-x-1 divide-gray-400">
        <div className="col-span-7 pr-3">{content}</div>
        <div className="col-span-2 text-center font-semibold">{category}</div>
        <div className="col-span-2 text-center font-semibold">{status}</div>
        <div className="col-span-1 text-center">
          <RemoveBugEntry report={report} />
        </div>
      </div>
      <div className="text-xs border-t-1 py-1 dark:border-gray-600 border-gray-400">
        <p className="text-rose-500">Reported by: {user.name}</p>
      </div>
    </div>
  );
}
