"use client";

import { Character } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function NoteTabOpponent({
  characterList,
  currentPath,
  opponent,
  filter,
  gameSlug,
}: {
  characterList: Character[];
  currentPath: string;
  opponent: string;
  filter?: string;
  gameSlug: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (linkTab: string) => {
    if (linkTab === opponent) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "MATCHUPS");
    params.set("opponent", linkTab);
    if (filter) {
      params.set("filter", filter);
    }
    if (params.has("query")) {
      params.delete("query");
    }
    const newQuery = params.toString();
    router.push(`${currentPath}?${newQuery}`);
  };

  return (
    <div className="flex gap-2 p-2 w-full flex-wrap justify-center max-w-[90%] mx-auto">
      {characterList.map((char) => (
        <button onClick={() => handleClick(char.id)} key={char.id}>
          <img
            src={
              char.avatarUrl
                ? `/character-icons/${gameSlug}/${char.avatarUrl.toLowerCase()}-sml.webp`
                : `/profile-image-placeholder.gif`
            }
            width={80}
            height={80}
            alt={`Character portrait for ${char.name}`}
            className={`rounded-md  
              ${
                opponent === char.id
                  ? `border-rose-500`
                  : `hover:border-rose-500 cursor-pointer border-transparent`
              }  border-2`}
          />
        </button>
      ))}
    </div>
  );
}
