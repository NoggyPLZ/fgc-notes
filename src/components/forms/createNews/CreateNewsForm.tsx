"use client";
import Button from "@/components/ui/Button";
import { newsPostSchema, TNewsPostSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createNewsAction } from "@/actions/actions";

export default function CreateNewsForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TNewsPostSchema>({
    resolver: zodResolver(newsPostSchema),
  });

  const onSubmit = async (data: TNewsPostSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log("formData", formData);

    const result = await createNewsAction(undefined, formData);
    if (!result?.errors) {
      reset();
      onSuccess();
    }
  };

  return (
    <form
      className="flex flex-col gap-3 pt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="title">Title</label>
      <input
        {...register("title")}
        className="border-1 border-gray-400 rounded-2xl p-3 w-full"
      />
      <label htmlFor="content">Content</label>
      <textarea
        {...register("content")}
        className="border-1 border-gray-400 rounded-2xl p-3 w-full"
      />
      <Button style="primary" type="submit" disabled={isSubmitting}>
        Create News Post
      </Button>
    </form>
  );
}
