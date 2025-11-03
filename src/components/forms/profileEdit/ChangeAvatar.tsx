import { getAvatars } from "@/lib/getAvatars";
import ChangeAvatarSelect from "./ChangeAvatarSelect";

export default function ChangeAvatar({
  avatar,
  name,
}: {
  avatar: string | null;
  name: string;
}) {
  const avatars = getAvatars();
  return (
    <>
      <div className="flex w-[200px] h-[200px] items-center justify-center border-1 border-gray-300 rounded-2xl">
        {avatar !== null ? (
          <img
            src={avatar}
            alt={`Profile image for ${name}.`}
            height={200}
            width={200}
            className="rounded-2xl"
          />
        ) : (
          <p>No profile image.</p>
        )}
      </div>
      <ChangeAvatarSelect avatars={avatars} />
    </>
  );
}
