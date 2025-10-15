import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { prisma } from "@/lib/db";
import BugEntry from "./BugEntry";

export default async function BugReportFeed() {
  const bugReports = await prisma.bugReport.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!bugReports) {
    <DashboardCard>
      <p>No bugs found.</p>
    </DashboardCard>;
  }

  console.log(bugReports);

  return (
    <DashboardCard>
      <>
        <h2 className="text-rose-500 font-black text-5xl">Bug Reports</h2>
        {bugReports.length < 1 && (
          <p className="py-5">There are currently no bug reports</p>
        )}
        {bugReports.map((report) => (
          <BugEntry report={report} key={report.id} />
        ))}
      </>
    </DashboardCard>
  );
}
