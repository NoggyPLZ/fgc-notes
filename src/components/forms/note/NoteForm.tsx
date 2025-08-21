"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { TNoteSchema, noteSchema } from "@/lib/types";
import { noteSubmit } from "@/actions/actions";
import { useState } from "react";
import { Character, Note, NoteCategory } from "@prisma/client";
import { useActionState } from "react";

type NoteFormProps = {
  characterList: Character[];
  mainCharacter: Character;
  game: string;
  latestCategory?: NoteCategory;
  latestOpponent?: string | null;
};

export default function NoteForm(props: NoteFormProps) {
  const { characterList, mainCharacter, game, latestCategory, latestOpponent } =
    props;
  const [category, setCategory] = useState<NoteCategory>(
    latestCategory ?? "NEUTRAL"
  );
  const [opponent, setOpponent] = useState(
    latestOpponent ?? characterList[0].id
  );
  const [state, noteSubmitAction] = useActionState(noteSubmit, undefined);
  const [numberOfNotes, setNumberOfNotes] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TNoteSchema>({
    resolver: zodResolver(noteSchema),
  });

  return (
    <div>
      <form action={noteSubmitAction} className="flex flex-col gap-5">
        <input type="hidden" name="characterslug" value={mainCharacter.slug} />
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
            className="border-1 border-gray-400 rounded-2xl p-5"
          />
          {state?.errors?.note && (
            <p className="text-red-500">{state.errors.note}</p>
          )}
          <div className="flex flex-row">
            <Button type="submit" style={"primary"}>
              Submit Note
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
