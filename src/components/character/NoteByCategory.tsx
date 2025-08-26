import SingleNote from "@/components/character/SingleNote";
import { NoteWithUserSafe, TVoteSums } from "@/lib/types";
import { Character, Note, NoteCategory } from "@prisma/client";

type NoteByCategoryProps = {
  category: NoteCategory;
  notes: NoteWithUserSafe[];
  characterList: Character[];
  voteSums: TVoteSums[];
};

export default function NoteByCategory(props: NoteByCategoryProps) {
  const { category, notes, characterList, voteSums } = props;
  // console.log(voteSums);
  const matchupNotes = notes.filter((note) => note.opponentId !== null);
  return (
    <div>
      <h1 className="font-black">{category}</h1>
      {notes.length < 1 && `No notes for ${category}, be the first!`}
      {category === "MATCHUPS" ? (
        <div>
          {characterList.map((char, i) => (
            <div key={i}>
              <h2 className="font-bold">{char.name}</h2>
              {matchupNotes.map((note, midx) => (
                <div key={midx}>
                  {note.opponentId === char.id && (
                    <SingleNote note={note} voteSums={voteSums} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          {notes.map((note, i) => (
            <SingleNote key={i} note={note} voteSums={voteSums} />
          ))}
        </>
      )}
    </div>
  );
}
