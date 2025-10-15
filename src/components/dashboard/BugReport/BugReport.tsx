import BugReportForm from "@/components/forms/BugReportForm/BugReportForm";
import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { getCurrentUser } from "@/lib/auth";

export default async function BugReport() {
  const user = getCurrentUser();
  if (!user) {
    console.log("User not logged in.");
  }
  return (
    <DashboardCard>
      <h1 className="text-5xl text-rose-500 font-black">Report Site Issues</h1>
      <BugReportForm />
    </DashboardCard>
  );
}
