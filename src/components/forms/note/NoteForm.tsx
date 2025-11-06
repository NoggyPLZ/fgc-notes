"use client";

import Button from "@/components/ui/Button";
import { noteSubmit } from "@/actions/actions";
import { useRef, useState } from "react";
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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

  const notationHelper = (symbol: string) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    textarea.value = value.slice(0, start) + symbol + value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + symbol.length;

    textarea.focus();
  };

  return (
    <>
      {verified ? (
        <div>
          <form action={noteSubmitAction} className="flex flex-col gap-5 pb-2">
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
              <div className="flex flex-col basis-1/2 gap-2">
                <label htmlFor="category" className="font-bold">
                  Category
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value as NoteCategory)}
                  name="category"
                  id="category"
                  value={category}
                  className="dark:bg-neutral-950 border-b-3 border-gray-400  p-4 bg-neutral-100 border-b-rose-500 text-rose-500 dark:text-gray-100 font-bold"
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
                <div className="flex flex-col basis-1/2 gap-2">
                  <label htmlFor="opponent" className="font-bold">
                    Matchup
                  </label>
                  <select
                    name="opponent"
                    id="opponent"
                    value={opponent}
                    className="dark:bg-neutral-950 border-b-3 border-gray-400 p-4 bg-neutral-100 border-b-rose-500 text-rose-500 dark:text-gray-100 font-bold capitalize"
                    onChange={(e) => setOpponent(e.target.value)}
                  >
                    {characterList.map((char) => (
                      <option
                        key={char.slug}
                        value={char.id}
                        className="capitalize"
                      >
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
              <div className="flex gap-2">
                <div className="grid grid-rows-3 grid-cols-3 gap-1">
                  {["↖", "↑", "↗", "←", "", "→", "↙", "↓", "↘"].map(
                    (symbol, i) => (
                      <>
                        {symbol.length === 0 ? (
                          <div className="bg-gray-100"></div>
                        ) : (
                          <button
                            type="button"
                            className="py-2 px-3 font-black text-lg bg-neutral-900 text-gray-100 font-sans cursor-pointer hover:bg-rose-500"
                            onClick={() => notationHelper(symbol)}
                            key={i}
                          >
                            {symbol}
                          </button>
                        )}
                      </>
                    )
                  )}
                </div>

                <div className="grid grid-rows-3 grid-cols-4 gap-1">
                  {[
                    "DRC",
                    "DR",
                    "SJC",
                    "DI",
                    "LP",
                    "MP",
                    "HP",
                    "PP",
                    "LK",
                    "MK",
                    "HK",
                    "KK",
                  ].map((attackBut, i) => (
                    <>
                      <button
                        className="bg-neutral-900 text-gray-100 p-3 rounded-2xl cursor-pointer hover:bg-rose-500 font-black"
                        type="button"
                        key={i}
                        onClick={() => notationHelper(attackBut)}
                      >
                        {attackBut}
                      </button>
                    </>
                  ))}
                </div>
              </div>
              <textarea
                name="note"
                id="note"
                placeholder="Type note here..."
                className="border-b-3 border-b-rose-500 border-gray-400  p-5 field-sizing-content min-h-40 bg-gray-100 focus:outline-rose-600 focus:outline-1 outline-transparent outline-1 dark:bg-neutral-950 caret-rose-500"
                minLength={5}
                maxLength={2000}
                rows={5}
                ref={textAreaRef}
              />
              {state?.errors?.note && (
                <p className="text-red-500">{state.errors.note}</p>
              )}
              <div className="flex flex-row">
                <Button type="submit" style={"primary"} disabled={pending}>
                  {pending ? `Submitting Note...` : `Submit Note`}
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="pb-2">
          <h1 className="text-rose-500 font-black uppercase text-3xl">
            I see you&apos;re not verfied yet
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
