export default function Footer() {
  return (
    <footer className="flex mt-auto py-10 text-center px-5 bg-neutral-950 place-items-center text-gray-100 font-light">
      <div className="flex flex-col w-[90%] mx-auto items-center justify-center gap-4">
        <div className="flex flex-row gap-4">
          <div className="w-[150px]">
            <img
              src="/tech-trap-logos/logo-dark.webp"
              alt="TechTrap logo"
              width={250}
              height={250}
            />
          </div>
          <div className="font-black text-4xl text-left flex flex-col justify-between pt-3 pb-4">
            <p>Play</p>
            <p>Learn</p>
            <p>Share</p>
            <br />
          </div>
        </div>
        <div className="w-full">
          {" "}
          <hr className="text-neutral-800" />
        </div>
        <div className="">
          bhicksdev &copy; {new Date().getFullYear().toString()}
        </div>
      </div>
    </footer>
  );
}
