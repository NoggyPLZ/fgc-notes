import ChangeName from "@/components/forms/profileEdit/ChangeName";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { UserPen } from "lucide-react";
import ChangeAvatar from "@/components/forms/profileEdit/ChangeAvatar";
import ChangeTheme from "@/components/forms/profileEdit/ChangeTheme";
import VerifyEmail from "@/components/dashboard/VerifyEmail";

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
    <div className=" p-5 rounded-2xl flex md:flex-row flex-col gap-10">
      <div className="flex flex-col gap-10 bg-gray-200 dark:bg-gray-800 p-10 rounded-2xl max-w-[800px]">
        <ChangeAvatar avatar={user.avatarUrl} name={user.name} />
        <div>
          <span className="text-3xl text-rose-500 font-black">{user.name}</span>{" "}
          {owner && <ChangeName id={currentUser.id} />}
        </div>
      </div>
      <div className="flex flex-col gap-5 bg-gray-200 dark:bg-gray-800 p-10 rounded-2xl">
        <h4 className="border-b-1 border-gray-300 dark:border-gray-900 pb-5">
          <span className="text-rose-500 font-black text-xl uppercase">
            Email:
          </span>{" "}
          <>{user.email}</>
        </h4>
        <h4 className="border-b-1 border-gray-300 dark:border-gray-900 pb-5">
          <span className="text-rose-500 font-black text-xl uppercase">
            Joined:
          </span>{" "}
          <>{user.createdAt.toString()}</>
        </h4>
        <h4 className="border-b-1 border-gray-300 dark:border-gray-900 pb-5">
          <span className="text-rose-500 font-black text-xl uppercase">
            Status:
          </span>{" "}
          <>{user.status}</>
        </h4>
        {user.verified ? (
          <div>
            <h4 className="border-b-1 border-gray-300 dark:border-gray-900 pb-5">
              <span className="text-rose-500 font-black text-xl uppercase">
                Verified:
              </span>{" "}
              Thank you for being Verified!
            </h4>
          </div>
        ) : (
          <div>
            <h4 className="border-b-1 border-gray-300 dark:border-gray-900 pb-5">
              <span className="text-rose-500 font-black text-xl uppercase">
                Verified:
              </span>{" "}
              Our records indicate you are not verified yet.
            </h4>
            <VerifyEmail />
          </div>
        )}
        <div className="flex items-center gap-2">
          <h4 className="font-black text-rose-500 uppercase text-xl">Theme:</h4>
          <ChangeTheme />
        </div>
      </div>
    </div>
  );
}
