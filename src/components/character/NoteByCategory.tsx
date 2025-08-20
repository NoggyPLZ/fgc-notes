import SingleNote from "@/components/character/SingleNote";
import { NoteWithUserSafe } from "@/lib/types";
import { Note, NoteCategory } from "@prisma/client";

type NoteByCategoryProps = {
  category: NoteCategory;
  notes: NoteWithUserSafe[];
};

export default function NoteByCategory(props: NoteByCategoryProps) {
  const { category, notes } = props;

  return (
    <div>
      <h1>{category}</h1>
      {notes.length < 1 && `No notes for ${category}, be the first!`}
      {notes.map((note, i) => (
        <p key={i}>{note.content}</p>
      ))}
    </div>
  );
}
