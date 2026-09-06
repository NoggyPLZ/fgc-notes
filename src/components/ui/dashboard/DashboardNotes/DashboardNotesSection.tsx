import { prisma } from "@/lib/db";
import DashboardNote from "./DashboardNote";

export default async function DashboardNoteSection() {
  const recentNotes = await prisma.note.findMany({
    take: 15,
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
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 p-2 pb-6 shadow-sm outer-clip relative">
      <div className="clip"></div>
      <h2 className="bg-neutral-900 font-black text-neutral-100 text-5xl -mx-2 -mt-2 p-3 border-b-1 border-l-4 border-l-rose-500 border-b-gray-300 dark:border-b-gray-900">
        Recent Notes
      </h2>
      {recentNotes.map((note) => (
        <DashboardNote key={note.id} note={note} />
      ))}
    </div>
  );
}
