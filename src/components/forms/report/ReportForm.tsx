"use client";
import { reportAction } from "@/actions/actions";
import Button from "@/components/ui/Button";
import { NoteWithUserSafe, reportSchema, TReportSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ReportForm({
  note,
  clickHandler,
}: {
  note: NoteWithUserSafe;
  clickHandler: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TReportSchema>({
    defaultValues: {
      noteId: note.id,
    },
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (data: TReportSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log("formData", formData);

    const result = await reportAction(undefined, formData);
    if (!result?.errors) {
      clickHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input {...register("noteId")} type="hidden" />
      <label htmlFor="reason" className="font-semibold">
        Reason for Report
      </label>
      <select
        {...register("reason")}
        className="border-1 border-gray-300 rounded-2xl p-3 dark:bg-gray-800 bg-gray-100"
      >
        <option value="harrassment">Harrassment</option>
        <option value="racism">Racism/Bigotry</option>
        <option value="sexual">Sexual Violence</option>
      </select>
      <label htmlFor="info" className="font-semibold">
        Additional Info:
      </label>
      <input
        {...register("info")}
        className="border-1 border-gray-300 rounded-2xl p-3 focus:outline-rose-600 focus:outline-1"
      />
      <Button type="submit" style="primary" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
