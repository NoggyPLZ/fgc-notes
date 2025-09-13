import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { prisma } from "@/lib/db";

export default async function PopularCharacters() {
  const characters = await prisma.character.findMany({
    take: 3,
    orderBy: {
      notesAsMain: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          notesAsMain: true,
        },
      },
    },
  });
  return (
    <DashboardCard>
      <p className="text-center font-bold uppercase">Most popular characters</p>
      <div className="flex md:flex-row flex-col justify-between">
        {characters.map((char) => (
          <div key={char.id} className="flex-row flex items-center">
            <h2 className="text-5xl font-black text-rose-500 text-center">
              {char.name}
            </h2>
            <p>{char._count.notesAsMain} Notes</p>
          </div>
        ))}
        <div className="flex-row flex items-center">
          <h2 className="text-5xl font-black text-rose-500 text-center">
            asdf
          </h2>
          <p>3 Notes</p>
        </div>
      </div>
    </DashboardCard>
  );
}
