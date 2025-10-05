import { prisma } from "@/lib/db";
import DashboardNote from "./DashboardNote";

export default async function DashboardNoteSection() {
  const recentNotes = await prisma.note.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      Character: {
        select: { name: true, slug: true, Game: { select: { slug: true } } },
      },
      Opponent: { select: { name: true, slug: true } },
    },
  });

  if (!recentNotes) {
    return <p>No recent notes found.</p>;
  }

  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 rounded-2xl p-2 pb-6 shadow-sm">
      <h2 className="font-black text-rose-500 text-5xl p-3 border-b-1 border-b-gray-300 dark:border-b-gray-900">
        Recent Notes
      </h2>
      {recentNotes.map((note) => (
        <DashboardNote key={note.id} note={note} />
      ))}
    </div>
  );
}
