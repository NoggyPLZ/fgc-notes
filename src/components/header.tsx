import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-2 bg-gray-100 flex">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <Image
          src="/tech-trap-logos/techtrap-horz-full-logo.webp"
          alt="TechTrap logo"
          width={75}
          height={75}
        />
      </div>
    </header>
  );
}
