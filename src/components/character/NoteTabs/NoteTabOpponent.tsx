"use client";

import { Character } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function NoteTabOpponent({
  characterList,
  currentPath,
  opponent,
}: {
  characterList: Character[];
  currentPath: string;
  opponent: string;
}) {
  return (
    <div className="flex gap-2 p-2 max-w-[500px] flex-wrap justify-center">
      {characterList.map((char) => (
        <Link
          href={`${currentPath}?tab=matchup&opponent=${char.slug}`}
          key={char.id}
        >
          <Image
            src={
              char.avatarUrl
                ? `/character-icons/${char.avatarUrl.toLowerCase()}-sml.webp`
                : `/profile-image-placeholder.gif`
            }
            width={75}
            height={75}
            alt={`Character portrait for ${char.name}`}
            className="rounded-md"
          />
        </Link>
      ))}
    </div>
  );
}
