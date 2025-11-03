"use client";

import Link from "next/link";

export default function LogoWrapper() {
  return (
    <Link
      href={"/"}
      className="text-gray-500 p-3 rounded-2xl text-2xl text-center"
    >
      <img
        src={`/tech-trap-logos/techtrap-vert-full-logo-lm.webp`}
        alt={"vertical tech trap logo"}
        width={100}
        height={100}
        className="hidden dark:md:flex"
      />
      <img
        src={`/tech-trap-logos/techtrap-logo-lm.webp`}
        height={100}
        width={100}
        alt={`Tech Trap logo`}
        className="hidden dark:flex dark:md:hidden"
      />
      <img
        src={`/tech-trap-logos/techtrap-vert-full-logo.webp`}
        alt={"vertical tech trap logo"}
        width={100}
        height={100}
        className="hidden md:flex dark:hidden"
      />
      <img
        src={`/tech-trap-logos/techtrap-logo.webp`}
        height={100}
        width={100}
        alt={`Tech Trap logo`}
        className="md:hidden dark:hidden"
      />
    </Link>
  );
}
