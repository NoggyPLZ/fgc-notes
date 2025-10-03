"use client";
import Button from "@/components/ui/Button";
import { createNews } from "@/actions/actions";
import { useActionState, useEffect } from "react";

export default function CreateNewsForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [state, createNewsAction, pending] = useActionState(
    createNews,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state?.success, onSuccess]);

  return (
    <form className="flex flex-col gap-3 pt-5" action={createNewsAction}>
      <label htmlFor="title">Title</label>
      <input
        name="title"
        id="title"
        type="text"
        className="border-1 border-gray-400 rounded-2xl p-3 w-full"
        required
      />
      {state?.errors?.title && <p className="text-red-500">Needs a title</p>}
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        className="border-1 border-gray-400 rounded-2xl p-3 w-full"
        required
      />
      {state?.errors?.content && <p className="text-red-500">Needs content</p>}
      <Button style="primary" type="submit" disabled={pending}>
        Create News Post
      </Button>
    </form>
  );
}
