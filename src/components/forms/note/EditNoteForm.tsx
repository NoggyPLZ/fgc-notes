"use client";

import { editNoteSchema, NoteWithUserSafe, TEditNoteSchema } from "@/lib/types";
import Button from "@/components/ui/Button";
import { editSubmit } from "@/actions/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function EditNoteForm({
  note,
  onSuccess,
}: {
  note: NoteWithUserSafe;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TEditNoteSchema>({
    resolver: zodResolver(editNoteSchema),
  });

  const content = note.content;

  const onSubmit = async (data: TEditNoteSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const results = await editSubmit(undefined, formData);
    if (results?.errors) {
      const errors = results.errors;
      if (errors.content) {
        setError("content", {
          type: "server",
          message: errors.content[0],
        });
      }
    }
    if (results?.success) {
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 py-2"
    >
      <input {...register("id")} type="hidden" name="id" value={note.id} />
      <textarea
        {...register("content")}
        name="content"
        className="border-1 border-gray-400 rounded-2xl p-3 w-full"
        placeholder={content}
        defaultValue={content}
      />
      {errors.content && (
        <p className="text-red-500">{errors.content.message}</p>
      )}
      <div>
        <Button style={"primary"} type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  );
}
