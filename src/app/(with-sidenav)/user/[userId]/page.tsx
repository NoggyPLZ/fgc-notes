import ChangeName from "@/components/forms/profileEdit/ChangeName";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { UserPen } from "lucide-react";

export default async function UserProfile({
  params,
}: {
  params: { userId: string };
}) {
  const { userId: userId } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      verified: true,
      status: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    return <p>no user found!</p>;
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <p>You are not logged in.</p>;
  }

  const profileImageCheck = user.avatarUrl !== null;

  const owner = currentUser.id === user.id;

  return (
    <div className="bg-gray-200 p-5 rounded-2xl flex flex-col gap-5">
      <div className="relative flex w-[200px] h-[200px] items-center justify-center border-1 border-gray-300 rounded-2xl">
        {user.avatarUrl !== null ? (
          <Image src={user.avatarUrl} alt={`Profile image for ${user.name}.`} />
        ) : (
          <p>No profile image.</p>
        )}
        <div className="absolute -bottom-5 -right-5 ">
          <button className="p-3 bg-green-500 text-gray-100 rounded-2xl cursor-pointer hover:bg-green-600">
            <UserPen size={25} />
          </button>
        </div>
      </div>
      <h1>
        User Name: {user.name} {owner && <ChangeName />}
      </h1>

      <h3>
        Email: <strong>{user.email}</strong>
      </h3>
      <h4>
        Joined: <strong>{user.createdAt.toString()}</strong>
      </h4>
      <h4>
        Status: <strong>{user.status}</strong>
      </h4>
      <h4>
        Verified:{" "}
        {user.verified
          ? "Thank you for being verified!"
          : "Our records indicate you are not verified yet."}
      </h4>
      <h4>Theme:</h4>
      <input type="checkbox" />
    </div>
  );
}
