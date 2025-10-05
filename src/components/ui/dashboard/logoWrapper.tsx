"use client";

import Image from "next/image";
import Link from "next/link";

export default function LogoWrapper() {
  return (
    <Link
      href={"/"}
      className="text-gray-500 p-3 rounded-2xl text-2xl text-center"
    >
      <Image
        src={`/tech-trap-logos/techtrap-vert-full-logo-lm.webp`}
        alt={"vertical tech trap logo"}
        width={100}
        height={100}
        className="hidden dark:md:flex"
      />
      <Image
        src={`/tech-trap-logos/techtrap-logo-lm.webp`}
        height={100}
        width={100}
        alt={`Tech Trap logo`}
        className="hidden dark:flex dark:md:hidden"
      />
      <Image
        src={`/tech-trap-logos/techtrap-vert-full-logo.webp`}
        alt={"vertical tech trap logo"}
        width={100}
        height={100}
        className="hidden md:flex dark:hidden"
      />
      <Image
        src={`/tech-trap-logos/techtrap-logo.webp`}
        height={100}
        width={100}
        alt={`Tech Trap logo`}
        className="md:hidden dark:hidden"
      />
    </Link>
  );
}
