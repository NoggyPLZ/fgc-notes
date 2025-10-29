import SingleNote from "@/components/character/SingleNote";
import { NoteWithUserSafe, TVoteSums } from "@/lib/types";
import { Character, NoteCategory } from "@prisma/client";

type NoteByCategoryProps = {
  category: NoteCategory;
  notes: NoteWithUserSafe[];
  characterList: Character[];
  voteSums: TVoteSums[];
  currentUserId: string;
  verified?: boolean;
  role: "USER" | "ADMIN";
};

export default function NoteSearchResults(props: NoteByCategoryProps) {
  const {
    category,
    notes,
    characterList,
    voteSums,
    currentUserId,
    verified,
    role,
  } = props;
  const matchupNotes = notes.filter((note) => note.opponentId !== null);
  if (notes.length < 1) return;
  return (
    <>
      <h1 className="font-black text-rose-500 text-5xl pb-5">{category}</h1>
      {notes.length < 1 && <p>{`No notes for ${category}, be the first!`}</p>}
      {category === "MATCHUPS" ? (
        <div className="grid grid-cols-1 gap-4 w-full">
          {characterList.map((char, i) => (
            <div key={i} className="flex flex-col">
              <h2 className="font-black text-2xl text-rose-500 uppercase">
                {char.name}
              </h2>
              {matchupNotes.map((note) => (
                <div key={note.id}>
                  {note.opponentId === char.id && (
                    <SingleNote
                      note={note}
                      voteSums={voteSums}
                      currentUserId={currentUserId}
                      verified={verified}
                      role={role}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          {notes.map((note) => (
            <SingleNote
              key={note.id}
              note={note}
              voteSums={voteSums}
              currentUserId={currentUserId}
              verified={verified}
              role={role}
            />
          ))}
        </>
      )}
    </>
  );
}
