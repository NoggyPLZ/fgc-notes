import { RecentNote } from "@/lib/types";

export default function DashboardNote({ note }: { note: RecentNote }) {
  const {
    content,
    category,
    opponentId,
    characterId,
    createdAt,
    rating,
    Character,
    Opponent,
  } = note;

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="p-3 border-b-1 dark:border-b-gray-900 border-b-gray-300 flex flex-col gap-3 drop-shadow-sm">
      <p className="font-semibold">{content}</p>
      <div className="flex flex-row text-xs italic gap-2">
        <p className="text-rose-600 dark:text-rose-100 dark:bg-rose-700 dark:px-2 dark:rounded-sm font-black">
          {rating}
        </p>
        <p className="border-l-1 border-l-gray-400 dark:border-l-gray-900 pl-2">
          {formattedDate}
        </p>
        <p>
          {Opponent
            ? `${Character.name} vs ${Opponent.name}`
            : `${Character.name} > ${category}`}
        </p>
      </div>
    </div>
  );
}
