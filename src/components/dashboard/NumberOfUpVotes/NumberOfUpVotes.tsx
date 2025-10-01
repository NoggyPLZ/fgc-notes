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
      value: 1,
    },
  });
  return (
    <DashboardCard bg="magenta">
      <p className="text-center font-bold uppercase text-sm md:text-md text-gray-100">
        UpVotes Made
      </p>
      <h2 className="md:text-8xl text-5xl font-black text-gray-100 text-center">
        {upVoteCount.length}
      </h2>
    </DashboardCard>
  );
}
