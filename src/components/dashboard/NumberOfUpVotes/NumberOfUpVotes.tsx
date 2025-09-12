import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function NumberOfUpVotes() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <p>No logged in user.</p>;
  }

  const upVoteCount = await prisma.votes.findMany({
    where: {
      userId: currentUser.id,
    },
  });
  return (
    <DashboardCard>
      <p className="text-center font-bold uppercase">Total Up Votes</p>
      <h2 className="text-8xl font-black text-rose-500 text-center">
        {upVoteCount.length}
      </h2>
    </DashboardCard>
  );
}
