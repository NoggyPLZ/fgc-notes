"use client";

import { avatarAction } from "@/actions/actions";
import Button from "@/components/ui/Button";
import { UserPen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ChangeAvatarSelect({ avatars }: { avatars: string[] }) {
  const [toggle, setToggle] = useState(false);
  const [select, setSelect] = useState("");
  return (
    <>
      <div className="">
        <button
          className="p-3 bg-green-500 text-gray-100 rounded-2xl cursor-pointer hover:bg-green-600 flex font-black gap-4 justify-center items-center"
          onClick={() => setToggle((prev) => !prev)}
        >
          Change Avatar <UserPen size={25} />
        </button>
      </div>
      {toggle && (
        <>
          <div className="flex flex-wrap gap-5 max-h-[350px] overflow-y-scroll">
            {avatars.map((avatar, i) => (
              <div key={i}>
                <img
                  src={`/${avatar}`}
                  width={100}
                  height={100}
                  alt={`avatar for ${avatar}`}
                  className={`rounded-2xl ${
                    select === `/${avatar}`
                      ? "border-2 border-rose-500 shadow-md/50"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setSelect(`/${avatar}`)}
                />
              </div>
            ))}
          </div>
          <div>
            <Button
              style="primary"
              type="submit"
              onClick={() => avatarAction(select)}
            >
              Save Avatar
            </Button>
          </div>
        </>
      )}
    </>
  );
}
