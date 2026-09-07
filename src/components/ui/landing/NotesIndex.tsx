import { prisma } from "@/lib/db";
import SingleNoteIndex from "./SingleNoteIndex";

export default async function NotesIndex() {
  const recentNotes = await prisma.note.findMany({
    take: 5,
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
    <div className="max-w-[1440px] bg-neutral-100 relative outer-clip mx-4 lg:mx-auto lg:-top-15">
      <div className="clip"></div>
      <h2 className="bg-neutral-900 font-black text-neutral-100 text-4xl  p-3 border-b-1 border-l-4 border-l-rose-500 border-b-gray-300 dark:border-b-gray-900">
        Recent Notes
      </h2>
      {recentNotes.map((note) => (
        <SingleNoteIndex key={note.id} note={note} />
      ))}
    </div>
  );
}
