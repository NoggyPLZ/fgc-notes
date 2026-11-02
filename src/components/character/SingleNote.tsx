import { NoteWithUserAndVote, NoteWithUserSafe, TVoteSums } from "@/lib/types";
import NoteRating from "./NoteRating";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";
import ReportNote from "./ReportNote";

type SingleNoteProps = {
  note: NoteWithUserSafe;
  voteSums: TVoteSums[];
  currentUserId: string;
  verified?: boolean;
  role: "USER" | "ADMIN";
  game: string;
};

export default function SingleNote(props: SingleNoteProps) {
  const { note, voteSums, currentUserId, verified, role, game } = props;

  const creatorPresent = currentUserId === note.userId;
  const adminPresent = role === "ADMIN";

  const voteSum = voteSums.filter((vote) => vote.noteId === note.id);
  const total = voteSum[0]?._sum?.value || 0;

  const date = new Date(note.updatedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const canEdit = (creatorPresent && verified) || adminPresent;

  return (
    <div className="relative flex flex-col gap-3">
      <div className="flex flex-row gap-3 mb-2 border-b-1 px-4 border-gray-300 dark:border-neutral-600 pb-1">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-3">
            <h3 className="text-base/5 font-semibold whitespace-pre-wrap note-content">
              {note.content}
              {canEdit && <EditNote note={note} game={game} />}
            </h3>
          </div>
          <div className="flex flex-row gap-3 mt-2 items-center relative p-1">
            {creatorPresent ? (
              <div className="text-rose-500 dark:text-rose-400 py-1 font-black">
                {total + 1}
              </div>
            ) : (
              <>
                <NoteRating rating={total} note={note as NoteWithUserAndVote} />
                <h5 className="text-xs font-light truncate">
                  {note.User.name}
                </h5>
              </>
            )}
            <span className="text-xs italic">{`last edited ${formattedDate}`}</span>
            {canEdit ? (
              <DeleteNote note={note} />
            ) : (
              <>{verified && <ReportNote note={note} />}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
