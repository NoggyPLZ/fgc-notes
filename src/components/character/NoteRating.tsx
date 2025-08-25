"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { voteSubmit } from "@/actions/actions";

type ActiveValueType = "1" | "-1" | null;

export default function NoteRating(props: any) {
  const [state, voteSubmitAction] = useActionState(voteSubmit, undefined);
  const [activeButton, setActiveButton] = useState<"1" | "-1" | null>(null);
  const { rating, note } = props;

  const clickHandler = (e: any) => {
    const value = e.target.value;
    if (
      (activeButton === "1" && value === "1") ||
      (activeButton === "-1" && value === "-1")
    ) {
      setActiveButton(null);
    } else {
      setActiveButton(value);
    }
  };

  return (
    <div className="flex flex-row gap-1">
      {rating}
      <form action={voteSubmitAction} className="flex flex-row gap-1">
        <input type="hidden" name="noteId" value={note.id} />
        <button
          name="value"
          onClick={clickHandler}
          value="1"
          className={`cursor-pointer  rounded-md p-1 text-gray-200 hover:bg-green-600 ${
            activeButton === "1" ? `bg-green-600` : `bg-gray-600`
          }`}
        >
          <ThumbsUp size={15} />
        </button>
        <button
          name="value"
          onClick={clickHandler}
          value="-1"
          className={`cursor-pointer  rounded-md p-1 text-gray-200 hover:bg-gray-900 ${
            activeButton === "-1" ? `bg-gray-900` : `bg-gray-600`
          }`}
        >
          <ThumbsDown size={15} />
        </button>
      </form>
    </div>
  );
}
