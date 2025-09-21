import EditNote from "@/components/character/EditNote";
import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { prisma } from "@/lib/db";
import ReportedNote from "./ReportedNote";
import { NoteWithUserSafe } from "@/lib/types";

export default async function ReportFeed() {
  const reports = await prisma.reports.findMany({
    include: {
      Note: {
        include: {
          User: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      reporter: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!reports) {
    <DashboardCard>
      <p>No reports found.</p>
    </DashboardCard>;
  }

  return (
    <DashboardCard>
      <h2 className="text-rose-500 font-black text-5xl">Reports</h2>
      {reports.length < 1 && (
        <p className="text-center my-auto">There are current no reports.</p>
      )}
      {reports.map((report) => (
        <ReportedNote
          key={report.id}
          report={report}
          note={report.Note as NoteWithUserSafe}
        />
      ))}
    </DashboardCard>
  );
}
