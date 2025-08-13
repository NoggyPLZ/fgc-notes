"use client";
import Link from "next/link";

export default function NavLinks() {
  const links = [
    {
      name: "Select a Game",
      href: "/select/",
    },
  ];
  return (
    <div className="py-2 flex flex-row md:flex-col">
      {links.map((link, i) => (
        <Link
          className="p-5 text-center rounded-2xl w-full bg-gray-400"
          key={i}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
