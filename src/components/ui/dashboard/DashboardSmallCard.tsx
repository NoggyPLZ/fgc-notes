export default function DashboardSmallCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-900 text-neutral-300 px-8 py-4 flex items-center justify-between relative overflow-hidden outer-clip text-sm border-l-4 border-rose-500">
      <div className="clip"></div>
      {children}
    </div>
  );
}
