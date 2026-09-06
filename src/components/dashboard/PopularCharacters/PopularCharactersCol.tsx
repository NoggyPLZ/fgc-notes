import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { prisma } from "@/lib/db";
import CharacterArtWithSkeleton from "./CharacterArtWithSkeleton";
import Link from "next/link";

export default async function PopularCharactersCol() {
  const characters = await prisma.character.findMany({
    take: 5,
    orderBy: [
      {
        notesAsMain: {
          _count: "desc",
        },
      },
      { name: "asc" },
    ],
    include: {
      _count: {
        select: {
          notesAsMain: true,
        },
      },
      Game: {
        select: { slug: true },
      },
    },
  });

  return (
    <div
      className={`flex flex-col bg-gray-200 dark:bg-gray-800 h-full p-5 shadow-sm outer-clip relative`}
    >
      <div className="clip"></div>
      <h2 className="bg-neutral-900 font-black text-neutral-100 text-2xl -mx-5 -mt-5 p-3 border-b-1 border-l-4 border-l-rose-500 border-b-gray-300 dark:border-b-gray-900">
        Most popular characters
      </h2>
      <div className="flex pt-2 flex-col gap-2 justify-between">
        {characters.map((char) => (
          <div key={char.id} className="flex flex-col">
            <div className="flex-row flex items-center gap-2">
              <div className=" -skew-x-12">
                <div className="skew-x-12">
                  <CharacterArtWithSkeleton
                    src={`${
                      char.avatarUrl
                        ? `/character-icons/${
                            char.Game.slug
                          }/${char.avatarUrl.toLowerCase()}-sml.webp`
                        : `/profile-image-placeholder.gif`
                    }`}
                    alt={`Character portrait for ${char.name}`}
                    width={30}
                    height={30}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between items-center w-full gap-2">
                <h2 className="text-2xl font-black text-rose-500 text-center capitalize">
                  <Link href={`/select/${char.Game.slug}/${char.slug}`}>
                    {char.name}
                  </Link>
                </h2>
                <p className="font-black">{char._count.notesAsMain}</p>
              </div>
            </div>
            <div className="h-2 w-full bg-neutral-300 -skew-x-12">
              <div
                className={`h-full bg-rose-500`}
                style={{
                  width: `${
                    (char._count.notesAsMain /
                      characters[0]._count.notesAsMain) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
