export default function Footer() {
  return (
    <footer className="flex mt-auto py-10 text-center px-5 bg-neutral-950 place-items-center text-gray-100 font-light">
      <div className="flex flex-row w-[90%] mx-auto items-center justify-center gap-10">
        <div>
          <img
            src="/tech-trap-logos/techtrap-horz-full-logo-lm.webp"
            alt="TechTrap logo"
            width={100}
            height={100}
          />
        </div>
        <div className="">
          bhicksdev &copy; {new Date().getFullYear().toString()}
        </div>
      </div>
    </footer>
  );
}
