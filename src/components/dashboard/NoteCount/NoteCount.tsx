import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function NoteCount() {
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
      <DashboardCard>
        <p className="text-center font-bold uppercase text-sm md:text-md">
          Number of notes
        </p>
        <h2 className="md:text-8xl text-5xl font-black text-rose-500 text-center">
          {count.length}
        </h2>
      </DashboardCard>
    </>
  );
}
