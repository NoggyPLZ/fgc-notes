import BugReportFeed from "@/components/dashboard/admin/BugReportFeed/BugReportFeed";
import ReportFeed from "@/components/dashboard/admin/ReportFeed/ReportFeed";
import BugReport from "@/components/dashboard/BugReport/BugReport";
import FavoriteCharacter from "@/components/dashboard/FavoriteCharacter/FavoriteCharacter";
import NoteCount from "@/components/dashboard/NoteCount/NoteCount";
import NumberOfUpVotes from "@/components/dashboard/NumberOfUpVotes/NumberOfUpVotes";
import PopularCharacters from "@/components/dashboard/PopularCharacters/PopularCharacters";
import SiteNews from "@/components/dashboard/SiteNews/SiteNews";
import SmallCardSKeleton from "@/components/skeletons/dashboard/SmallCardSkeleton";
import DashboardNoteSection from "@/components/ui/dashboard/DashboardNotes/DashboardNotesSection";
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    console.log(`No user found`);
  }

  const admin = user?.role === "ADMIN";

  return (
    <div className="grid md:grid-rows-6 gap-2 md:gap-5">
      <div className="grid 2xl:grid-cols-6 grid-rows-1 gap-2 md:gap-5">
        <div className="grid col-span-3 grid-cols-3 md:grid-cols-3 lg:grid-cols-3 row-span-1 grid-rows-1 md:grid-rows-1 gap-2 md:gap-5">
          <Suspense fallback={<SmallCardSKeleton />}>
            <NoteCount />
          </Suspense>
          <Suspense fallback={<SmallCardSKeleton />}>
            <NumberOfUpVotes />
          </Suspense>
          <Suspense fallback={<SmallCardSKeleton />}>
            <FavoriteCharacter />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<SmallCardSKeleton />}>
            <PopularCharacters />
          </Suspense>
        </div>
      </div>
      <div className={`row-span-5 grid grid-cols-6 md:gap-5 gap-2`}>
        <div
          className={`col-span-full 2xl:col-span-4 grid-rows-6 grid gap-2 md:gap-5 md:order-1 order-2`}
        >
          {admin ? (
            <>
              <div className="row-span-3">
                <SiteNews admin={admin} />
              </div>
              <div className="row-span-3 flex lg:flex-row flex-col lg:gap-5 gap-2">
                <div className="lg:w-[50%]">
                  <ReportFeed />
                </div>
                <div className="lg:w-[50%]">
                  <BugReportFeed />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row-span-3">
                <SiteNews />
              </div>
              <div className="row-span-3">
                <BugReport />
              </div>
            </>
          )}
        </div>
        <div className="col-span-full 2xl:col-span-2 md:order-2 order-1">
          <DashboardNoteSection />
        </div>
      </div>
    </div>
  );
}
