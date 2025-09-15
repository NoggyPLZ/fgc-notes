import FavoriteCharacter from "@/components/dashboard/FavoriteCharacter/FavoriteCharacter";
import NoteCount from "@/components/dashboard/NoteCount/NoteCount";
import NumberOfUpVotes from "@/components/dashboard/NumberOfUpVotes/NumberOfUpVotes";
import PopularCharacters from "@/components/dashboard/PopularCharacters/PopularCharacters";
import SiteNews from "@/components/dashboard/SiteNews/SiteNews";
import DashboardNoteSection from "@/components/ui/dashboard/DashboardNotes/DashboardNotesSection";

export default function Dashboard() {
  return (
    <div className="grid md:grid-rows-6 gap-2 md:gap-5">
      <div className="grid xl:grid-cols-6 grid-rows-1 gap-2 md:gap-5">
        <div className="grid col-span-3 grid-cols-3 md:grid-cols-3 lg:grid-cols-3 row-span-1 grid-rows-1 md:grid-rows-1 gap-2 md:gap-5">
          <NoteCount />
          <NumberOfUpVotes />
          <FavoriteCharacter />
        </div>
        <div className="col-span-3">
          <PopularCharacters />
        </div>
      </div>
      <div className="row-span-5 grid grid-cols-6 md:gap-5 gap-2">
        <div className="col-span-full lg:col-span-4">
          <SiteNews />
        </div>
        <div className="col-span-full lg:col-span-2">
          <DashboardNoteSection />
        </div>
      </div>
    </div>
  );
}
