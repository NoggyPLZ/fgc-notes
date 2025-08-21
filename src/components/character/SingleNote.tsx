import { NoteWithUserSafe } from "@/lib/types";
import NoteRating from "./NoteRating";

type SingleNoteProps = {
  note: NoteWithUserSafe;
};

export default function SingleNote(props: SingleNoteProps) {
  const { note } = props;

  const date = new Date(note.updatedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="flex flex-col gap-3 mb-5">
      <div className="flex flex-row gap-3 mb-2">
        <div>{/* {image here} */}</div>
        <div className="flex flex-col">
          <h5 className="text-xs font-light">{note.User.name}</h5>
          <h3 className="text-lg">{note.content}</h3>
          <div className="flex flex-row gap-3 mt-2">
            <NoteRating />
            <span className="text-xs italic">{`last edited ${formattedDate}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
