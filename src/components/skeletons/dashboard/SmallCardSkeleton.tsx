import DashboardCard from "@/components/ui/dashboard/DashboardCard";

export default function SmallCardSKeleton() {
  return (
    <DashboardCard>
      <div className="flex flex-col h-[90px] md:h-[120px] justify-between">
        <div className="p-2 md:p-4 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-2xl"></div>
        <div className="p-2 md:p-4 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-2xl"></div>
        <div className="p-2 md:p-4 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-2xl"></div>
      </div>
    </DashboardCard>
  );
}
