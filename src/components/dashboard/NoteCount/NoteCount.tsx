import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import DashboardSmallCard from "@/components/ui/dashboard/DashboardSmallCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DashboardSizetype } from "@/lib/types";

export default async function NoteCount({ size }: { size: DashboardSizetype }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <p>No logged in user.</p>;
  }

  const count = await prisma.note.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  return (
    <>
      {size === "mobile" ? (
        <DashboardCard bg={"magenta"}>
          <p className="text-center font-bold uppercase text-sm md:text-md text-gray-100">
            Number of notes
          </p>
          <h2 className="md:text-8xl text-5xl font-black text-gray-100 text-center">
            {count.length}
          </h2>
        </DashboardCard>
      ) : (
        <DashboardSmallCard>
          <p className="text-center font-bold uppercase text-sm md:text-md text-gray-300">
            Number of notes
          </p>
          <h2 className="md:text-6xl text-5xl font-black text-gray-100 text-center">
            {count.length}
          </h2>
        </DashboardSmallCard>
      )}
    </>
  );
}
