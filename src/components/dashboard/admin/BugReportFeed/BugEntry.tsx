import { BugReport } from "@prisma/client";
import RemoveBugEntry from "./RemoveBugEntry";

type BugReportWithUser = BugReport & {
  user: {
    name: string;
  };
};

export default function BugEntry({ report }: { report: BugReportWithUser }) {
  console.log("report: ", report);
  const { content, status, user, category } = report;
  return (
    <div className="flex flex-col gap-2 py-5">
      <div className="grid grid-cols-12">
        <div className="col-span-7">{content}</div>
        <div className="col-span-2">{category}</div>
        <div className="col-span-2">{status}</div>
        <div className="col-span-1">
          <RemoveBugEntry report={report} />
        </div>
      </div>
      <div className="text-xs border-t-1 py-1 dark:border-gray-600">
        <p>Reported by: {user.name}</p>
      </div>
    </div>
  );
}
