export default function DashboardLargeCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col  bg-gray-200 dark:bg-gray-800 p-5 shadow-sm`}
    >
      {children}
    </div>
  );
}
