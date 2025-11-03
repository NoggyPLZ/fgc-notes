"use client";

import { Character } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import NoteTabOpponent from "./NoteTabOpponent";

export default function NoteTabs({
  characterSlug,
  gameSlug,
  tab,
  opponent,
  characterList,
  filter,
}: {
  characterSlug: string;
  gameSlug: string;
  tab: string;
  opponent?: string;
  characterList: Character[];
  filter?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentPath = `/select/${gameSlug}/${characterSlug}`;
  const tabLinks = [
    {
      name: "NEUTRAL",
      linkTo: `${currentPath}?tab=NEUTRAL`,
    },
    {
      name: "COMBOS",
      linkTo: `${currentPath}?tab=COMBOS`,
    },
    {
      name: "SETPLAY",
      linkTo: `${currentPath}?tab=SETPLAY`,
    },
    {
      name: "MATCHUPS",
      linkTo: `${currentPath}?tab=MATCHUPS`,
    },
  ];

  const handleClick = (linkTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("opponent") && linkTab !== "MATCHUPS") {
      params.delete("opponent");
    }
    if (filter) {
      params.set("filter", filter);
    }
    if (params.has("query")) {
      params.delete("query");
    }
    params.set("tab", linkTab);
    const newQuery = params.toString();
    startTransition(() => {
      router.push(`${currentPath}?${newQuery}`);
    });
  };

  const popRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (opponent) popRef.current?.hidePopover();
  }, [opponent]);

  return (
    <div className="dark:bg-gray-900 bg-gray-300 pt-2 flex gap-1">
      {tabLinks.map((link, i) =>
        link.name === "MATCHUPS" ? (
          <button
            key={i}
            className={`rounded-tr-2xl border-l-10 border-l-rose-500 uppercase cursor-pointer p-4 hover:bg-rose-500 hover:text-gray-100 font-black border-gray-400 ${
              tab === link.name
                ? "bg-rose-500 text-gray-100 pointer-none border-b-rose-500"
                : "bg-gray-200 dark:bg-gray-950"
            }`}
            popoverTarget="opponentsPopup"
            disabled={isPending}
          >
            {link.name}
          </button>
        ) : (
          <button
            key={i}
            className={`rounded-tr-2xl border-l-10 border-l-rose-500 uppercase p-4 hover:bg-rose-500 hover:text-gray-100 font-black border-gray-400 ${
              tab === link.name
                ? "bg-rose-500 text-gray-100 pointer-none border-b-rose-500"
                : "bg-gray-200 dark:bg-gray-950 cursor-pointer"
            }`}
            onClick={() => handleClick(link.name)}
            disabled={isPending || tab === link.name}
          >
            {link.name}
          </button>
        )
      )}
      <div
        popover="auto"
        id="opponentsPopup"
        className="relative inset-y-0 mx-auto my-auto transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left opacity-0 shadow-lg/50 transition-all [transition-behavior:allow-discrete] duration-500 sm:w-full sm:max-w-[600px] sm:p-6 w-[90%] dark:bg-gray-900 dark:border-1 dark:border-gray-950 [&:is([open],:popover-open)]:opacity-100 [@starting-style]:[&:is([open],:popover-open)]:opacity-0"
        ref={popRef}
      >
        <NoteTabOpponent
          characterList={characterList}
          currentPath={currentPath}
          opponent={opponent || ""}
          filter={filter}
        />
      </div>
    </div>
  );
}
