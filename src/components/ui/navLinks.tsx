"use client";
import Link from "next/link";
import { Joystick, NotepadText } from "lucide-react";

export default function NavLinks() {
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
  ];
  return (
    <div className="py-2 flex flex-row md:flex-col">
      {links.map((link, i) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className="p-5 text-center w-full bg-gray-200 font-semibold border-gray-300 border-t-1 hover:bg-rose-500 hover:text-gray-100 flex flex-row justify-center gap-3"
            key={i}
            href={link.href}
          >
            <LinkIcon strokeWidth={2} />
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
