import SingleNote from "@/components/character/SingleNote";
import { NoteWithUserSafe, TVoteSums } from "@/lib/types";
import { Character, NoteCategory } from "@prisma/client";

type NoteByCategoryProps = {
  notes: NoteWithUserSafe[];
  characterList: Character[];
  voteSums: TVoteSums[];
  currentUserId: string;
  verified?: boolean;
  tab: string;
  opponent?: string;
  role: "USER" | "ADMIN";
};

export default function NoteCategorySection(props: NoteByCategoryProps) {
  const {
    notes,
    characterList,
    voteSums,
    currentUserId,
    verified,
    role,
    tab,
    opponent,
  } = props;

  const oppChar = characterList.filter((char) => char.id === opponent);

  const matchupNotes = notes.filter((note) => note.opponentId === opponent);

  console.log("note length", notes.length);
  return (
    <>
      <h1 className="font-black text-rose-500 text-5xl pb-5">{tab}</h1>
      {tab === "MATCHUPS" ? (
        <>
          <h2 className="font-black text-neutral-500 text-4xl pb-5 capitalize pl-5">
            {oppChar[0].name}
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
            {matchupNotes.length < 1 && (
              <p>{`No ${tab.toLocaleLowerCase()} notes for ${
                oppChar[0].name
              }, be the first!`}</p>
            )}
            {notes.map((note) => (
              <div key={note.id}>
                {note.opponentId === opponent && (
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
        </>
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
          {notes.length < 1 && <p>{`No notes for ${tab}, be the first!`}</p>}
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
        </div>
      )}
    </>
  );
}
