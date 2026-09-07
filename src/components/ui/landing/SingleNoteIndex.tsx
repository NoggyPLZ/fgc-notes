import { RecentNote } from "@/lib/types";

export default function SingleNoteIndex({ note }: { note: RecentNote }) {
  const { content, category, createdAt, rating, Character, Opponent } = note;

  return (
    <div className="p-3 border-b-1 border-b-gray-300 flex flex-col gap-3">
      <p className="font-semibold whitespace-pre-wrap note-content text-neutral-900">
        {content}
      </p>
      <div className="flex flex-row text-neutral-900 text-xs italic gap-2 items-center">
        <p className="text-rose-600 dark:px-2 dark:rounded-sm font-black">
          {rating + 1}
        </p>
        <p className="border-l-1 border-l-gray-400 dark:border-l-gray-900 pl-2"></p>
        {Opponent ? (
          <div className="flex justify-between items-center">
            <div>
              <p>
                {Character.name} vs {Opponent.name}
              </p>
            </div>
            <div>
              <p>Matchup</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center grow">
            <p>{Character.name}</p>
            <div className="border-l-5 border-l-rose-500 bg-neutral-900 text-neutral-100 -skew-x-12">
              <p className="px-3 py-1 skew-x-12 relative">{category}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
