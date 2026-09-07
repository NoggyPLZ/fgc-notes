import { prisma } from "@/lib/db";
export default async function NewsIndex() {
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
    return (
      <>
        <h2 className="text-5xl text-rose-500 font-black">Site News</h2>
        <div className="flex gap-2 pt-2 items-center">
          <span className="font-semibold border-r-1 border-rose-500 pr-2">
            Admin
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Anos Domina 2025
          </span>
        </div>
        <p className="text-lg pt-5">
          No one should see this. If you do see this, the news is gone and
          something has gone terribly wrong. Ono preserve us.
        </p>
      </>
    );
  }

  const date = new Date(news.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="pinstripe dark-bg relative p-4">
      <div className="max-w-[1440px] bg-neutral-100 relative outer-clip mx-auto -top-15">
        <div className="clip"></div>
        <h2 className="bg-neutral-900 font-black text-neutral-100 text-4xl  p-3 border-b-1 border-l-4 border-l-rose-500 border-b-gray-300 dark:border-b-gray-900">
          Latest News
        </h2>
        <div className="p-4 text-neutral-900">
          <h3 className="text-5xl text-rose-500 font-black">{news.title}</h3>
          <div className="flex gap-2 pt-2 items-center">
            <span className="font-semibold border-r-1 border-rose-500 pr-2">
              {news.user.name}
            </span>
            <span className="text-sm text-gray-600">{formattedDate}</span>
          </div>
          <p className="text-lg pb-5 whitespace-pre-wrap">{news.content}</p>
        </div>
      </div>
    </div>
  );
}
