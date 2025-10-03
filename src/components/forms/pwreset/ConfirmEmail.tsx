"use client";

import { confirmEmailSchema, TConfirmEmailSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { confirmEmailForPW } from "@/actions/actions";

export default function ConfirmEmail({
  handleClick,
}: {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TConfirmEmailSchema>({
    resolver: zodResolver(confirmEmailSchema),
  });

  const onSubmit = async (data: TConfirmEmailSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log(formData);
    const results = await confirmEmailForPW(undefined, formData);
    if (results?.errors) {
      const errors = results.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email[0],
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 rounded-2xl mx-auto gap-5"
    >
      <label htmlFor="email">Email used:</label>
      <input
        {...register("email")}
        name="email"
        placeholder=""
        className=" border-1 border-gray-300 rounded-2xl p-5"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Button style="primary" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
      <Button style={"secondary"} onClick={handleClick} value={"login"}>
        Remembered password? Login
      </Button>
    </form>
  );
}
