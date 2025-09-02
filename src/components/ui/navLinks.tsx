"use client";
import Link from "next/link";
import { Joystick, NotepadText, Settings } from "lucide-react";

export default function NavLinks({ userId }: { userId: string }) {
  const links = [
    {
      name: "Games",
      href: "/select/",
      icon: Joystick,
    },
    {
      name: "Notes",
      href: "/select/",
      icon: NotepadText,
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
            className="p-5 text-center md:grow-0 grow w-full bg-gray-200 dark:bg-gray-800 font-semibold border-gray-300 dark:border-gray-950 border-t-1 hover:bg-rose-500 hover:text-gray-100 items-center flex flex-col md:flex-row justify-center gap-3"
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
