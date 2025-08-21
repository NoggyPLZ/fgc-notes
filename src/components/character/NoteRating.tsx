import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function NoteRating(props: any) {
  const { rating } = props;
  return (
    <div className="flex flex-row gap-1">
      {rating}
      <button className="cursor-pointer bg-gray-600 rounded-md p-1 text-gray-200 hover:bg-green-600">
        <ThumbsUp size={15} />
      </button>
      <button className="cursor-pointer bg-gray-600 rounded-md p-1 text-gray-200 hover:bg-gray-900">
        <ThumbsDown size={15} />
      </button>
    </div>
  );
}
