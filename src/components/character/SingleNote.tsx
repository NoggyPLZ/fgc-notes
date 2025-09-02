import { NoteWithUserAndVote, NoteWithUserSafe, TVoteSums } from "@/lib/types";
import NoteRating from "./NoteRating";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

type SingleNoteProps = {
  note: NoteWithUserSafe;
  voteSums: TVoteSums[];
  currentUserId: string;
};

export default function SingleNote(props: SingleNoteProps) {
  const { note, voteSums, currentUserId } = props;

  const creatorPresent = currentUserId === note.userId;

  const voteSum = voteSums.filter((vote) => vote.noteId === note.id);
  const total = voteSum[0]?._sum?.value || 0;

  const date = new Date(note.updatedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-3 mb-5 border-b-1 border-gray-300 dark:border-gray-950 pb-3">
      <div className="flex flex-row gap-3 mb-2">
        <div>{/* {image here} */}</div>
        <div className="flex flex-col">
          <h5 className="text-xs font-light">{note.User.name}</h5>
          <div className="flex flex-col gap-3">
            <h3 className="">
              {note.content}
              {creatorPresent && <EditNote note={note} />}
            </h3>
          </div>
          <div className="flex flex-row gap-3 mt-2 items-center">
            <NoteRating rating={total} note={note as NoteWithUserAndVote} />
            <span className="text-xs italic">{`last edited ${formattedDate}`}</span>
            {creatorPresent && <DeleteNote note={note} />}
          </div>
        </div>
      </div>
    </div>
  );
}
