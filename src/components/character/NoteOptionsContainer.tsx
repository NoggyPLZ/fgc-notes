import SearchBar from "../forms/search/SearchBar";
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
    <div className="bg-gray-800 dark:bg-gray-950 flex flex-col md:flex-row text-gray-100 justify-center items-center p-2 gap-5">
      <SearchBar characterSlug={characterSlug} gameSlug={gameSlug} />
      <NoteToggle
        characterSlug={characterSlug}
        gameSlug={gameSlug}
        filter={filter || "ALL"}
      />
    </div>
  );
}
