"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { changeNameSchema, TChangeNameSchema } from "@/lib/types";
import { editName } from "@/actions/actions";
import { PenLine } from "lucide-react";

export default function ChangeName({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TChangeNameSchema>({
    resolver: zodResolver(changeNameSchema),
  });

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = async (data: TChangeNameSchema) => {
    console.log("Testing name change");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const results = await editName(undefined, formData);
    if (results?.errors) {
      const errors = results.errors;
      if (errors.id) {
        setError("id", {
          type: "server",
          message: errors.id[0],
        });
      }
      if (errors.name) {
        setError("name", {
          type: "server",
          message: errors.name[0],
        });
      }
    }
    if (results?.success) {
      setIsOpen(false);
    }
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-5"
        >
          <input {...register("id")} type="hidden" value={id} name="id" />
          <label htmlFor="name">New Name:</label>
          <input
            {...register("name")}
            name="name"
            className="border-1 border-gray-300 rounded-2xl p-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <Button style="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            style="cancel"
            type="button"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </form>
      )}
    </>
  );
}
