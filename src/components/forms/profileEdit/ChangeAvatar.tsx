import { UserPen } from "lucide-react";
import Image from "next/image";

export default function ChangeAvatar({
  avatar,
  name,
}: {
  avatar: string | null;
  name: string;
}) {
  return (
    <div className="relative flex w-[200px] h-[200px] items-center justify-center border-1 border-gray-300 rounded-2xl">
      {avatar !== null ? (
        <Image src={avatar} alt={`Profile image for ${name}.`} />
      ) : (
        <p>No profile image.</p>
      )}
      <div className="absolute -bottom-5 -right-5 ">
        <button className="p-3 bg-green-500 text-gray-100 rounded-2xl cursor-pointer hover:bg-green-600">
          <UserPen size={25} />
        </button>
      </div>
    </div>
  );
}
