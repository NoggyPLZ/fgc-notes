"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
    <div className="flex rounded-2xl items-center">
      <div className="px-2 flex">
        Filter Notes
        <SlidersHorizontal size={25} />
      </div>
      <button
        className={`  px-3 py-2 rounded-l-2xl hover:bg-rose-500 hover:text-gray-100 font-black border-1 border-gray-900 ${
          filter === "ALL"
            ? "bg-rose-500 text-gray-100 pointer-none"
            : "bg-gray-300 text-gray-800 cursor-pointer"
        }`}
        onClick={() => {
          startTransition(() => {
            router.push(`/select/${gameSlug}/${characterSlug}?filter=ALL`);
          });
        }}
        disabled={isPending || filter === "ALL"}
      >
        ALL NOTES
      </button>
      <button
        className={`  px-3 py-2 rounded-r-2xl hover:bg-rose-500 hover:text-gray-100 font-black border-1 border-gray-900 ${
          filter === "USER"
            ? "bg-rose-500 text-gray-100 pointer-none"
            : "bg-gray-300 text-gray-800 cursor-pointer"
        }`}
        onClick={() => {
          startTransition(() => {
            router.push(`/select/${gameSlug}/${characterSlug}?filter=USER`);
          });
        }}
        disabled={isPending || filter === "USER"}
      >
        MY NOTES
      </button>
    </div>
  );
}
