import { logout } from "@/actions/actions";
import Link from "next/link";
import NavLinks from "../navLinks";

export default function SideNav() {
  return (
    <div className="flex flex-col h-full p-5 gap-5">
      <div>
        <Link
          href={"/"}
          className="bg-blue-500 text-gray-100 px-3 py-5 rounded-2xl text-2xl"
        >
          Logo for app here
        </Link>
      </div>
      <div className="flex grow flex-row md:flex-col justify-between">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <button className="rounded-2xl p-5 w-full bg-orange-600 text-gray-100 cursor-pointer">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
