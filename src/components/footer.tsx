export default function Footer() {
  return (
    <footer className="flex mt-auto py-5 text-center px-5 bg-gray-800 place-items-center text-gray-100 font-black">
      bhicksdev &copy; {new Date().getFullYear().toString()}
    </footer>
  );
}
