import NoteToggle from "./noteToggle/NoteToggle";

export default function NoteOptionsContainer({
  characterSlug,
  gameSlug,
  filter,
}: {
  characterSlug: string;
  gameSlug: string;
  filter: string;
}) {
  return (
    <div className="bg-gray-800 flex flex-col md:flex-row text-gray-100 justify-center items-center p-2">
      <NoteToggle
        characterSlug={characterSlug}
        gameSlug={gameSlug}
        filter={filter || "ALL"}
      />
    </div>
  );
}
