import { logout } from "@/actions/actions";
import Link from "next/link";
import NavLinks from "../navLinks";
import { Power } from "lucide-react";
import ProfilePreview from "../ProfilePreview";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export default async function SideNav() {
  const user = await getCurrentUser();
  if (!user) return <p>no user found</p>;
  return (
    <div className="flex flex-col h-full p-2">
      <div className="bg-gray-200 flex flex-col rounded-2xl grow">
        <Link
          href={"/"}
          className="text-gray-500 p-3 rounded-2xl text-2xl text-center"
        >
          Logo
        </Link>
        <ProfilePreview user={user} />
        <div className="flex grow flex-row md:flex-col justify-between">
          <NavLinks userId={user.id} />
          <div className="hidden h-auto grow md:block"></div>
          <form
            action={async () => {
              "use server";
              await logout();
            }}
            className=""
          >
            <button className="rounded-b-2xl py-5 w-full bg-rose-500 text-gray-100 cursor-pointer flex flex-row justify-center gap-3 hover:bg-rose-700 hover:text-gray-100">
              <Power strokeWidth={3} />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
