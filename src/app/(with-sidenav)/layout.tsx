import SideNav from "@/components/ui/dashboard/sideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen md:h-screen flex-col md:flex-row md:overflow-hidden bg-gray-300 dark:bg-gray-900">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-2 md:overflow-y-auto md:p-2">{children}</div>
    </div>
  );
}
