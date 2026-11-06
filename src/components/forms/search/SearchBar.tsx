"use client";

import { searchAction } from "@/actions/actions";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { searchSchema, TSearchSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

export default function SearchBar({
  characterSlug,
  gameSlug,
}: {
  characterSlug: string;
  gameSlug: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSearchSchema>({
    resolver: zodResolver(searchSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: TSearchSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await searchAction(formData);
    if (!result.errors) {
      const queryParam =
        result.data.query.length > 0
          ? `?query=${encodeURIComponent(result.data.query)}`
          : "";
      router.push(`/select/${gameSlug}/${characterSlug}${queryParam}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center gap-2 relative px-2"
      role="search"
    >
      {errors.query && (
        <div
          id="note-search-error"
          role="alert"
          className="text-red-800 absolute z-10 bottom-15 bg-gray-300 rounded-2xl text-sm p-2 shadow-2xl/50"
        >
          {errors.query.message}
        </div>
      )}
      <label htmlFor="note-search" className="sr-only">
        Search notes
      </label>
      <input
        id="note-search"
        type="search"
        {...register("query")}
        aria-invalid={errors.query ? true : undefined}
        aria-describedby={errors.query ? "note-search-error" : undefined}
        className="bg-gray-900 border-1 border-gray-300 rounded-2xl p-2 focus:outline-0 focus:border-rose-500 lg:w-[400px]"
      />
      <Button type="submit" style="primary" disabled={isSubmitting}>
        <span className="sr-only md:not-sr-only">Search</span>
        <Search aria-hidden="true" />
      </Button>
    </form>
  );
}
