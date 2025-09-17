import DeleteNote from "@/components/character/DeleteNote";
import EditNote from "@/components/character/EditNote";
import { NoteWithUserSafe, ReportWithNoteSafe } from "@/lib/types";

export default function ReportedNote({
  report,
  note,
}: {
  report: ReportWithNoteSafe;
  note: NoteWithUserSafe;
}) {
  console.log(note.id);
  return (
    <div
      key={report.id}
      className="py-5 border-b-1 border-gray-300 dark:border-gray-900 flex flex-col gap-2"
    >
      <p className="font-semibold">
        {report.Note.content}
        <EditNote note={note} />
      </p>
      <div className="flex text-gray-100">
        <h3 className="px-3 py-2 bg-rose-500 rounded-l-2xl font-bold">
          Reason: {report.reason}
        </h3>
        {report.info && (
          <p className="px-3 py-2 bg-gray-900 rounded-r-2xl">{report.info}</p>
        )}
      </div>
      <div className="flex gap-5">
        <p>author {report.Note.User.name}</p>
        <p>reported by {report.reporter.name}</p>
        <DeleteNote note={note} />
      </div>
    </div>
  );
}
