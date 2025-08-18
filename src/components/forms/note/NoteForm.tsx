"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { TNoteSchema, noteSchema } from "@/lib/types";
import { noteSubmit } from "@/actions/actions";
import { useState } from "react";
import { Character } from "@prisma/client";

type NoteFormProps = {
  characterList: Character[];
  mainCharacter: Character;
};

export default function NoteForm(props: NoteFormProps) {
  const { characterList, mainCharacter } = props;
  const [showMatchups, setShowMatchups] = useState<boolean>(false);
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

  const changeHandler = (e: any) => {
    const value = e.target.value;
    if (value === "MATCHUPS") {
      setShowMatchups(true);
    } else {
      setShowMatchups(false);
    }
  };
  console.log("list here", characterList);

  return (
    <div>
      <form className="flex flex-col gap-5">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col">
            <label htmlFor="category" className="font-bold">
              Category
            </label>
            <select
              onChange={changeHandler}
              name="category"
              defaultValue={"NEUTRAL"}
            >
              <option value="NEUTRAL">Neutral</option>
              <option value="COMBOS">Combos</option>
              <option value="SETPLAY">Setplay</option>
              <option value="MATCHUPS">Matchups</option>
            </select>
          </div>
          {showMatchups && (
            <div className="flex flex-col">
              <label htmlFor="matchup" className="font-bold">
                Matchup
              </label>
              <select name="matchup">
                {characterList.map((char) => (
                  <option key={char.slug} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="note">Note</label>
          <textarea name="note" />
        </div>
        <Button type="submit" style={"primary"}>
          Submit Note
        </Button>
      </form>
    </div>
  );
}
