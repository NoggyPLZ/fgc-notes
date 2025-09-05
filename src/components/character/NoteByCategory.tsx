import SingleNote from "@/components/character/SingleNote";
import { NoteWithUserSafe, TVoteSums } from "@/lib/types";
import { Character, Note, NoteCategory } from "@prisma/client";

type NoteByCategoryProps = {
  category: NoteCategory;
  notes: NoteWithUserSafe[];
  characterList: Character[];
  voteSums: TVoteSums[];
  currentUserId: string;
  verified?: boolean;
};

export default function NoteByCategory(props: NoteByCategoryProps) {
  const { category, notes, characterList, voteSums, currentUserId, verified } =
    props;
  // console.log(voteSums);
  const matchupNotes = notes.filter((note) => note.opponentId !== null);
  return (
    <div>
      <h1 className="font-black text-rose-500 text-5xl pb-5">{category}</h1>
      {notes.length < 1 && `No notes for ${category}, be the first!`}
      {category === "MATCHUPS" ? (
        <div className="flex lg:flex-row flex-col gap-4">
          {characterList.map((char, i) => (
            <div key={i} className="flex flex-col lg:w-1/2">
              <h2 className="font-bold">{char.name}</h2>
              {matchupNotes.map((note, midx) => (
                <div key={midx}>
                  {note.opponentId === char.id && (
                    <SingleNote
                      note={note}
                      voteSums={voteSums}
                      currentUserId={currentUserId}
                      verified={verified}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          {notes.map((note, i) => (
            <SingleNote
              key={i}
              note={note}
              voteSums={voteSums}
              currentUserId={currentUserId}
              verified={verified}
            />
          ))}
        </>
      )}
    </div>
  );
}
