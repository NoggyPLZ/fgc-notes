"use client";
import Link from "next/link";
import { Joystick, LayoutGrid, Settings } from "lucide-react";

export default function NavLinks({ userId }: { userId: string }) {
  const links = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutGrid,
    },
    {
      name: "Games",
      href: "/select/",
      icon: Joystick,
    },
    {
      name: "Profile Settings",
      href: `/user/${userId}`,
      icon: Settings,
    },
  ];
  return (
    <>
      {links.map((link, i) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className="p-5 md:text-left md:grow-0 grow w-full bg-gray-200 dark:bg-gray-800 font-semibold border-gray-300 dark:border-gray-950 border-t-1 hover:bg-rose-500 hover:text-gray-100  flex flex-col md:flex-row gap-3 text-center items-center justify"
            key={i}
            href={link.href}
          >
            <LinkIcon strokeWidth={2} />
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
