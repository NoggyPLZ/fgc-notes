import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { prisma } from "@/lib/db";
import Image from "next/image";
import CharacterArtWithSkeleton from "./CharacterArtWithSkeleton";

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
          <div key={char.id} className="flex-row flex items-center gap-2">
            <CharacterArtWithSkeleton
              src={`/character-icons/${char.name.toLowerCase()}-sml.webp`}
              alt={`Character portrait for ${char.name}`}
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-5xl font-black text-rose-500 text-center">
                {char.name}
              </h2>
              <p className="font-light">{char._count.notesAsMain} Notes</p>
            </div>
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
