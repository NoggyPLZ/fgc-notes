import FavoriteCharacter from "@/components/dashboard/FavoriteCharacter/FavoriteCharacter";
import NoteCount from "@/components/dashboard/NoteCount/NoteCount";
import NumberOfUpVotes from "@/components/dashboard/NumberOfUpVotes/NumberOfUpVotes";
import DashboardNoteSection from "@/components/ui/dashboard/DashboardNotes/DashboardNotesSection";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap flex-row lg:gap-5 md:p-0">
        <NoteCount />
        <NumberOfUpVotes />
        <FavoriteCharacter />
      </div>
      <div>
        <DashboardNoteSection />
      </div>
    </div>
  );
}
