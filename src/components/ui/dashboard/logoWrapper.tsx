"use client";

import Link from "next/link";

export default function LogoWrapper() {
  return (
    <Link
      href={"/"}
      className="text-gray-500 p-3 rounded-2xl text-2xl text-center"
    >
      <img
        src={`/tech-trap-logos/logo-dark.webp`}
        alt={"vertical tech trap logo"}
        width={250}
        height={250}
        className="hidden dark:md:flex w-[100px]"
      />
      <img
        src={`/tech-trap-logos/logo-dark.webp`}
        height={250}
        width={250}
        alt={`Tech Trap logo`}
        className="hidden dark:flex dark:md:hidden w-[150px]"
      />
      <img
        src={`/tech-trap-logos/logo-light.webp`}
        alt={"vertical tech trap logo"}
        width={250}
        height={250}
        className="hidden md:flex dark:hidden w-[100px]"
      />
      <img
        src={`/tech-trap-logos/logo-light.webp`}
        height={250}
        width={250}
        alt={`Tech Trap logo`}
        className="md:hidden dark:hidden w-[150px]"
      />
    </Link>
  );
}
