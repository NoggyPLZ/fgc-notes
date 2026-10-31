export default function Header() {
  return (
    <header className="py-2 pt-4 bg-gray-100 flex">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <img
          src="/tech-trap-logos/logo-light.webp"
          alt="TechTrap logo"
          width={250}
          height={250}
          className="w-28"
        />
      </div>
    </header>
  );
}
