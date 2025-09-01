import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@prisma/client";
import { UserForProfile } from "@/lib/types";

export default async function ProfilePreview({
  user,
}: {
  user: UserForProfile | null;
}) {
  // const user = await getCurrentUser();

  if (!user) {
    return <p>no user found</p>;
  }

  return (
    <div className="flex flex-col">
      <Image
        src={"/profile-image-placeholder.gif"}
        alt={"profile image placholder"}
        height={100}
        width={100}
        className="rounded-full border-1 mx-auto"
      />
      <div className="text-center">
        <p className="text-center text-rose-500">Welcome back,</p>
        <h4 className="text-xl text-gray-800">{user && user.name}</h4>
      </div>
    </div>
  );
}
