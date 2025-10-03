import Image from "next/image";
import { UserForProfile } from "@/lib/types";

export default async function ProfilePreview({
  user,
}: {
  user: UserForProfile | null;
}) {
  if (!user) {
    return <p>no user found</p>;
  }

  const avatar = user.avatarUrl || "/profile-image-placeholder.gif";

  return (
    <div className="flex flex-col gap-2">
      <Image
        src={avatar}
        alt={"profile image placholder"}
        height={100}
        width={100}
        className="rounded-full border-1 mx-auto"
      />
      <div className="text-center">
        <p className="text-center text-sm dark:text-gray-100 text-gray-800">
          Welcome back,
        </p>
        <h4 className="text-xl dark:text-rose-500 text-rose-500 font-semibold">
          {user && user.name}
        </h4>
      </div>
    </div>
  );
}
