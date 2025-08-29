"use client";

import { startTransition, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { voteHandle } from "@/actions/actions";
import { NoteWithUserAndVote } from "@/lib/types";

type ActiveValueType = "1" | "-1" | null;

type NoteRatingProps = {
  note: NoteWithUserAndVote;
  rating: number;
};

export default function NoteRating({ rating, note }: NoteRatingProps) {
  const voteState: ActiveValueType =
    note.votes && note.votes.length > 0
      ? note.votes[0].value === 1
        ? "1"
        : "-1"
      : null;
  const [optimisticVote, setOptimisticVote] =
    useState<ActiveValueType>(voteState);
  const [optimisticCount, setOptimisticCount] = useState<number>(rating);

  const handleVote = (type: ActiveValueType) => {
    setOptimisticCount((prev) => {
      if (optimisticVote === type) {
        return type === "1" ? prev - 1 : prev + 1; // undo
      }
      if (type === "1") {
        return optimisticVote === "-1" ? prev + 2 : prev + 1;
      } else if (type === "-1") {
        return optimisticVote === "1" ? prev - 2 : prev - 1;
      }
      return prev;
    });
    setOptimisticVote((prev) => (prev === type ? null : type));

    const voteEntry = {
      noteId: note.id,
      value: type,
    };
    startTransition(async () => {
      await voteHandle(voteEntry);
    });
  };

  return (
    <div className="flex flex-row gap-1">
      {optimisticCount + 1}
      <button
        name="value"
        onClick={() => handleVote("1")}
        value="1"
        className={`cursor-pointer  rounded-md p-1 text-gray-200 hover:bg-green-600 ${
          optimisticVote === "1" ? `bg-green-600` : `bg-gray-600`
        }`}
      >
        <ThumbsUp size={15} />
      </button>
      <button
        name="value"
        onClick={() => handleVote("-1")}
        value="-1"
        className={`cursor-pointer  rounded-md p-1 text-gray-200 hover:bg-gray-900 ${
          optimisticVote === "-1" ? `bg-gray-900` : `bg-gray-600`
        }`}
      >
        <ThumbsDown size={15} />
      </button>
      {/* </form> */}
    </div>
  );
}
