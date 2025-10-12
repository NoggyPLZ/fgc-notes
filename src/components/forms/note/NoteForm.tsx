"use client";

import Button from "@/components/ui/Button";
import { noteSubmit } from "@/actions/actions";
import { useState } from "react";
import { Character, NoteCategory } from "@prisma/client";
import { useActionState } from "react";
import VerifyEmail from "@/components/dashboard/VerifyEmail";

type NoteFormProps = {
  characterList: Character[];
  mainCharacter: Character;
  game: string;
  latestCategory?: NoteCategory;
  latestOpponent?: string | null;
  verified: boolean;
};

export default function NoteForm(props: NoteFormProps) {
  const {
    characterList,
    mainCharacter,
    game,
    latestCategory,
    latestOpponent,
    verified,
  } = props;
  const [category, setCategory] = useState<NoteCategory>(
    latestCategory ?? "NEUTRAL"
  );
  const [opponent, setOpponent] = useState(
    latestOpponent ?? characterList[0].id
  );
  const [state, noteSubmitAction, pending] = useActionState(
    noteSubmit,
    undefined
  );

  return (
    <>
      {verified ? (
        <div>
          <form action={noteSubmitAction} className="flex flex-col gap-5">
            <input
              type="hidden"
              name="characterslug"
              value={mainCharacter.slug}
            />
            <input type="hidden" name="gameslug" value={game} />
            <input type="hidden" name="character" value={mainCharacter.id} />
            {state?.errors?.user && (
              <p className="text-red-500">{state.errors.user}</p>
            )}
            <div className="flex flex-row gap-5">
              <div className="flex flex-col">
                <label htmlFor="category" className="font-bold">
                  Category
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value as NoteCategory)}
                  name="category"
                  id="category"
                  value={category}
                  className="dark:bg-gray-900"
                >
                  <option value="NEUTRAL">Neutral</option>
                  <option value="COMBOS">Combos</option>
                  <option value="SETPLAY">Setplay</option>
                  <option value="MATCHUPS">Matchups</option>
                </select>
                {state?.errors?.category && (
                  <p className="text-red-500">{state.errors.category}</p>
                )}
              </div>
              {category === "MATCHUPS" && (
                <div className="flex flex-col">
                  <label htmlFor="opponent" className="font-bold">
                    Matchup
                  </label>
                  <select
                    name="opponent"
                    id="opponent"
                    value={opponent}
                    className="dark:bg-gray-900"
                    onChange={(e) => setOpponent(e.target.value)}
                  >
                    {characterList.map((char) => (
                      <option key={char.slug} value={char.id}>
                        {char.name}
                      </option>
                    ))}
                  </select>
                  {state?.errors?.opponent && (
                    <p className="text-red-500">{state.errors.opponent}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <textarea
                name="note"
                id="note"
                placeholder="Type note here..."
                className="border-1 border-gray-400 rounded-2xl p-5 field-sizing-content min-h-40"
                minLength={5}
                maxLength={2000}
              />
              {state?.errors?.note && (
                <p className="text-red-500">{state.errors.note}</p>
              )}
              <div className="flex flex-row">
                <Button type="submit" style={"primary"} disabled={pending}>
                  Submit Note
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="pb-2">
          <h1 className="text-rose-500 font-black uppercase text-3xl">
            I see you're not verfied yet
          </h1>
          <p>
            To prevent abuses from bots and hooligans, we ask before making new
            notes that all users verify their accounts.
          </p>
          <VerifyEmail />
        </div>
      )}
    </>
  );
}
