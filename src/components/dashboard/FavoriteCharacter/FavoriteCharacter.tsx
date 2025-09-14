import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function FavoriteCharacter() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <p>No logged in user.</p>;
  }

  const currentFavChar = await prisma.note.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  const characterNums = new Map();
  currentFavChar.forEach((char) => {
    if (characterNums.has(char.characterId)) {
      const value = characterNums.get(char.characterId);
      characterNums.set(char.characterId, value + 1);
    } else {
      characterNums.set(char.characterId, 1);
    }
  });

  const countArr = Array.from(characterNums.entries());
  const charMax = (arr: any) => {
    let max = ["", 0];
    for (const num of arr) {
      if (num[1] > max[1]) {
        max = num;
      }
    }
    return max;
  };

  const characterToSearch = charMax(countArr);
  const result = await prisma.character.findUnique({
    where: {
      id: characterToSearch[0] as string,
    },
    include: {
      Game: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!result) {
    return <p>No char found</p>;
  }

  return (
    <DashboardCard>
      <p className="text-center font-bold uppercase text-sm md:text-md">
        Favorite Character
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-2">
        <Image
          src={`/character-icons/${result.name.toLowerCase()}-sml.webp`}
          alt={`Character portrait for ${result.name}`}
          width={100}
          height={100}
          className="rounded-2xl hidden md:flex"
        />
        <div className="flex flex-col">
          <h3 className="text-center font-medium text-sm hidden md:flex">
            {result.Game.name}
          </h3>
          <h2 className="text-2xl md:text-5xl font-black text-rose-500 text-center hover:text-rose-600">
            <Link href={`/select/${result.Game.slug}/${result.slug}`}>
              {result.name}
            </Link>
          </h2>
        </div>
      </div>
    </DashboardCard>
  );
}
