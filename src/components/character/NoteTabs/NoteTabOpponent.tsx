"use client";

import { Character } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function NoteTabOpponent({
  characterList,
  currentPath,
  opponent,
  filter,
}: {
  characterList: Character[];
  currentPath: string;
  opponent: string;
  filter?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (linkTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(params);
    params.set("tab", "MATCHUPS");
    params.set("opponent", linkTab);
    if (filter) {
      params.set("filter", filter);
    }
    const newQuery = params.toString();
    router.push(`${currentPath}?${newQuery}`);
  };

  return (
    <div className="flex gap-2 p-2 max-w-[500px] flex-wrap justify-center">
      {characterList.map((char) => (
        <button onClick={() => handleClick(char.id)} key={char.id}>
          <img
            src={
              char.avatarUrl
                ? `/character-icons/${char.avatarUrl.toLowerCase()}-sml.webp`
                : `/profile-image-placeholder.gif`
            }
            width={80}
            height={80}
            alt={`Character portrait for ${char.name}`}
            className="rounded-md border-transparent hover:border-rose-500 cursor-pointer border-2"
          />
        </button>
      ))}
    </div>
  );
}
