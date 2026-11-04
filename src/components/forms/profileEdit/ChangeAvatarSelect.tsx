"use client";

import { avatarAction } from "@/actions/actions";
import Button from "@/components/ui/Button";
import { UserPen } from "lucide-react";
import { useState } from "react";

export default function ChangeAvatarSelect({
  avatars,
}: {
  avatars: Record<string, string[]>;
}) {
  const [toggle, setToggle] = useState(false);
  const [select, setSelect] = useState("");
  return (
    <>
      <div className="py-4">
        <Button style="secondary" onClick={() => setToggle((prev) => !prev)}>
          Change Avatar <UserPen size={25} />
        </Button>
      </div>
      {toggle && (
        <>
          <div className="flex flex-wrap gap-5 max-h-[350px] overflow-y-scroll">
            {Object.entries(avatars).map(([game, avatarlist]) => (
              <section key={game} className="flex flex-wrap">
                <h3 className="w-full font-bold text-3xl border-b-1 mb-2">
                  {game.toUpperCase()}
                </h3>
                {avatarlist.map((avatar, i) => (
                  <div key={i}>
                    <img
                      src={`/${avatar}`}
                      width={100}
                      height={100}
                      alt={`avatar for ${avatar}`}
                      className={`rounded-2xl hover:border-2 hover:border-rose-500 hover:shadow-md/50 ${
                        select === `/${avatar}`
                          ? "border-2 border-rose-500 shadow-md/50"
                          : "border-2 border-transparent"
                      }`}
                      onClick={() => setSelect(`/${avatar}`)}
                    />
                  </div>
                ))}
              </section>
            ))}
          </div>
          <div className="pt-4">
            <Button
              style="primary"
              type="button"
              onClick={() => {
                setToggle(false);
                avatarAction(select);
              }}
            >
              Save Avatar
            </Button>
          </div>
        </>
      )}
    </>
  );
}
