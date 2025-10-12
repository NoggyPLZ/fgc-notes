import Image from "next/image";
import { UserForProfile } from "@/lib/types";
import UserGreeting from "./ProfilePreview/UserGreeting";

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
      <UserGreeting username={user.name} />
    </div>
  );
}
