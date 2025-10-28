import Image from "next/image";

export default function Header() {
  return (
    <header className="py-2 bg-gray-100 flex">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <img
          src="/tech-trap-logos/techtrap-horz-full-logo.webp"
          alt="TechTrap logo"
          width={150}
          height={150}
        />
      </div>
    </header>
  );
}
