"use client";

import { setNewPassword } from "@/actions/actions";
import Button from "@/components/ui/Button";
import { newPasswordSchema, TNewPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default function NewPass({
  resetId,
  userId,
}: {
  resetId: string;
  userId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TNewPasswordSchema>({
    defaultValues: {
      resetId: resetId,
      userId: userId,
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: TNewPasswordSchema) => {
    console.log("beginning onsubmit");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const results = await setNewPassword(undefined, formData);
    if (results?.errors) {
      const errors = results.errors;
      if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password[0],
        });
      }
    }
    if (!results?.errors) {
      redirect("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
      className="w-[600px] flex flex-col p-5 rounded-2xl mx-auto gap-5 dark:bg-gray-800 bg-gray-300"
    >
      <input {...register("resetId")} type="hidden" />
      <input {...register("userId")} type="hidden" />
      <label htmlFor="password">Password:</label>
      <input
        {...register("password")}
        name="password"
        className=" border-1 border-gray-300 rounded-2xl p-5"
        type="password"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        {...register("confirmPassword")}
        name="confirmPassword"
        className=" border-1 border-gray-300 rounded-2xl p-5"
        type="password"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}
      <Button style="primary" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
