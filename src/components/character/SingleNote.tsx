import { NoteWithUserAndVote, NoteWithUserSafe, TVoteSums } from "@/lib/types";
import NoteRating from "./NoteRating";

type SingleNoteProps = {
  note: NoteWithUserSafe;
  voteSums: TVoteSums[];
};

export default function SingleNote(props: SingleNoteProps) {
  const { note, voteSums } = props;

  const voteSum = voteSums.filter((vote) => vote.noteId === note.id);
  const total = voteSum[0]?._sum?.value || 0;

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
          <div className="flex flex-row gap-3 mt-2 items-center">
            <NoteRating rating={total + 1} note={note as NoteWithUserAndVote} />
            <span className="text-xs italic">{`last edited ${formattedDate}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
