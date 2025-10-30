import DeleteNote from "@/components/character/DeleteNote";
import EditNote from "@/components/character/EditNote";
import { NoteWithUserSafe, ReportWithNoteSafe } from "@/lib/types";
import DeleteReport from "./DeleteReport";

export default function ReportedNote({
  report,
  note,
}: {
  report: ReportWithNoteSafe;
  note: NoteWithUserSafe;
}) {
  return (
    <div
      key={report.id}
      className="py-5 border-b-1 border-gray-300 dark:border-gray-900 flex flex-col gap-2"
    >
      <div className="font-semibold">
        {report.Note.content}
        <EditNote note={note} />
      </div>
      <div className="flex text-gray-100 justify-between">
        <div className="flex items-center">
          <h3 className="px-3 py-2 bg-rose-500 rounded-l-2xl font-bold">
            Reason: {report.reason}
          </h3>
          {report.info && (
            <p className="px-3 py-2 bg-gray-900 rounded-r-2xl">{report.info}</p>
          )}
        </div>
        <DeleteReport reportId={report.id} />
      </div>

      <div className="flex gap-2">
        <p className="font-bold border-r-2 border-r-rose-500 pr-3">
          <span className="font-light">author</span> {report.Note.User.name}
        </p>
        <p className="font-bold">
          <span className="font-light">reported by</span> {report.reporter.name}
        </p>
        <DeleteNote note={note} />
      </div>
    </div>
  );
}
