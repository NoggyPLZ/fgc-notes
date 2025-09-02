import ChangeName from "@/components/forms/profileEdit/ChangeName";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { UserPen } from "lucide-react";
import ChangeAvatar from "@/components/forms/profileEdit/ChangeAvatar";
import ChangeTheme from "@/components/forms/profileEdit/ChangeTheme";

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
    <div className="bg-gray-200 dark:bg-gray-800 p-5 rounded-2xl flex flex-row gap-10">
      <ChangeAvatar avatar={user.avatarUrl} name={user.name} />
      <div className="flex flex-col gap-5">
        <h1>
          User Name: {user.name} {owner && <ChangeName id={currentUser.id} />}
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
        <ChangeTheme />
      </div>
    </div>
  );
}
