import { logout } from "@/actions/actions";
import Link from "next/link";
import NavLinks from "../navLinks";
import { Power } from "lucide-react";
import ProfilePreview from "../ProfilePreview";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";

export default async function SideNav() {
  const user = await getCurrentUser();
  if (!user) return <p>no user found</p>;
  return (
    <div className="flex flex-col h-full p-2">
      <div className="bg-gray-200 dark:bg-gray-800 flex flex-col rounded-2xl grow ">
        <div className="flex md:flex-col flex-row items-center gap-4 pt-3 pb-4 justify-center">
          <Link
            href={"/"}
            className="text-gray-500 p-3 rounded-2xl text-2xl text-center"
          >
            <Image
              src={`/tech-trap-logos/techtrap-logo.webp`}
              height={100}
              width={100}
              alt={`Tech Trap logo`}
            />
          </Link>
          <ProfilePreview user={user} />
        </div>
        <div className="flex grow flex-row md:flex-col justify-between">
          <NavLinks userId={user.id} />
          <div className="hidden w-full h-auto grow md:block"></div>
          <form
            action={async () => {
              "use server";
              await logout();
            }}
            className=" md:p-0"
          >
            <button className="px-10 py-5 md:p-5 grow h-auto md:rounded-b-2xl md:py-5 w-full hover:bg-rose-500 md:bg-rose-500 text-gray-100 cursor-pointer flex flex-col items-center md:flex-row justify-center gap-3 md:hover:bg-rose-700 hover:text-gray-100 md:border-0 border-t-1 dark:border-gray-950 rounded-br-2xl font-semibold">
              <Power strokeWidth={3} />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
