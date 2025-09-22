"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Toggle = "ALL" | "USER";

export default function NoteToggle({
  characterSlug,
  gameSlug,
  filter,
}: {
  characterSlug: string;
  gameSlug: string;
  filter: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex bg-gray-900 rounded-2xl">
      <button
        className={` cursor-pointer px-3 py-2  rounded-l-2xl hover:bg-gray-800 hover:text-gray-100 font-black border-1 border-gray-900 ${
          filter === "ALL"
            ? "bg-gray-800 text-gray-100"
            : "bg-gray-300 text-gray-800"
        }`}
        onClick={() => {
          startTransition(() => {
            router.push(`/select/${gameSlug}/${characterSlug}?filter=ALL`);
          });
        }}
        disabled={isPending}
      >
        ALL
      </button>
      <button
        className={` cursor-pointer px-3 py-2  rounded-r-2xl hover:bg-gray-800 hover:text-gray-100 font-black border-1 border-gray-900 ${
          filter === "USER"
            ? "bg-gray-800 text-gray-100"
            : "bg-gray-300 text-gray-800"
        }`}
        onClick={() => {
          startTransition(() => {
            router.push(`/select/${gameSlug}/${characterSlug}?filter=USER`);
          });
        }}
        disabled={isPending}
      >
        USER
      </button>
    </div>
  );
}
