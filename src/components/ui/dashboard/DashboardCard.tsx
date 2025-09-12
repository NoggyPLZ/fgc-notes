export default function DashboardCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col basis-1/2 md:basis-1/6 bg-gray-200 dark:bg-gray-800 rounded-2xl max-w-[600px] p-6 shadow-sm">
      {children}
    </div>
  );
}
