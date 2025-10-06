"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import { editName } from "@/actions/actions";
import { PenLine } from "lucide-react";
import { useActionState } from "react";

export default function ChangeName({ id }: { id: string }) {
  const [state, editNameAction, pending] = useActionState(editName, undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 cursor-pointer p-1 text-gray-100 rounded-md"
        onClick={handleToggle}
      >
        <PenLine size={15} />
      </button>
      {isOpen && (
        <form action={editNameAction} className="flex flex-col gap-5 mt-5">
          <input type="hidden" value={id} name="id" />
          <label htmlFor="name">New Name:</label>
          <input
            name="name"
            className="border-1 border-gray-300 rounded-2xl p-2"
          />
          {state?.errors?.name && (
            <p className="text-red-500">{state.errors.name}</p>
          )}
          <Button style="primary" type="submit" disabled={pending}>
            Submit
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            style="cancel"
            type="button"
            disabled={pending}
          >
            Cancel
          </Button>
        </form>
      )}
    </>
  );
}
