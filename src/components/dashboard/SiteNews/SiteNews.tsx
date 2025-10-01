import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { prisma } from "@/lib/db";
import CreateNews from "./CreateNews";

export default async function SiteNews({ admin }: { admin?: boolean }) {
  const news = await prisma.news.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!news) {
    return <p>No news is good news!</p>;
  }

  const date = new Date(news.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <DashboardCard>
      <h2 className="text-5xl text-rose-500 font-black">{news.title}</h2>
      <div className="flex gap-2 pt-2 items-center">
        <span className="font-semibold border-r-1 border-rose-500 pr-2">
          {news.user.name}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {formattedDate}
        </span>
      </div>
      <p className="text-lg pt-5">{news.content}</p>
      {admin && <CreateNews />}
    </DashboardCard>
  );
}
