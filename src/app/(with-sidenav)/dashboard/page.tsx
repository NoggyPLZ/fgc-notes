import { logout } from "@/actions/actions";
import Button from "@/components/ui/Button";
import DashboardNoteSection from "@/components/ui/dashboard/DashboardNotes/DashboardNotesSection";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <DashboardNoteSection />
      </div>
    </div>
  );
}
