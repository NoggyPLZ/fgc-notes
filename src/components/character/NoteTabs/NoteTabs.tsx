"use client";

import { Character } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import NoteTabOpponent from "./NoteTabOpponent";

export default function NoteTabs({
  characterSlug,
  gameSlug,
  tab,
  opponent,
  characterList,
}: {
  characterSlug: string;
  gameSlug: string;
  tab: string;
  opponent?: string;
  characterList: Character[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const currentPath = `/select/${gameSlug}/${characterSlug}`;
  const tabLinks = [
    {
      name: "neutral",
      linkTo: `${currentPath}?tab=neutral`,
    },
    {
      name: "combos",
      linkTo: `${currentPath}?tab=combos`,
    },
    {
      name: "setplay",
      linkTo: `${currentPath}?tab=setplay`,
    },
    {
      name: "matchup",
      linkTo: `${currentPath}?tab=matchup`,
    },
  ];

  const popRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (opponent) popRef.current?.hidePopover();
  }, [opponent]);

  return (
    <div className="dark:bg-gray-900 bg-gray-300 pt-2 flex gap-1">
      {tabLinks.map((link, i) =>
        link.name === "matchup" ? (
          <button
            key={i}
            className={`rounded-tr-2xl rounded-tl-md uppercase cursor-pointer p-4 hover:bg-rose-500 hover:text-gray-100 font-black border-gray-400 ${
              tab === link.name
                ? "bg-rose-500 text-gray-100 pointer-none border-b-rose-500"
                : "bg-gray-200 dark:bg-gray-900"
            }`}
            popoverTarget="opponentsPopup"
            disabled={isPending}
          >
            {link.name}
          </button>
        ) : (
          <button
            key={i}
            className={`rounded-tr-2xl rounded-tl-md uppercase p-4 hover:bg-rose-500 hover:text-gray-100 font-black border-gray-400 ${
              tab === link.name
                ? "bg-rose-500 text-gray-100 pointer-none border-b-rose-500"
                : "bg-gray-200 dark:bg-gray-900 cursor-pointer"
            }`}
            onClick={() => {
              startTransition(() => {
                router.push(link.linkTo);
              });
            }}
            disabled={isPending || tab === link.name}
          >
            {link.name}
          </button>
        )
      )}
      <div
        popover="auto"
        id="opponentsPopup"
        className="relative inset-y-0 mx-auto my-auto transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left opacity-0 shadow-xl transition-all [transition-behavior:allow-discrete] duration-500 sm:w-full sm:max-w-96 sm:p-6 dark:bg-gray-800 [&:is([open],:popover-open)]:opacity-100 [@starting-style]:[&:is([open],:popover-open)]:opacity-0"
        ref={popRef}
      >
        <NoteTabOpponent
          characterList={characterList}
          currentPath={currentPath}
          opponent={opponent || ""}
        />
      </div>
    </div>
  );
}
