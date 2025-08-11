"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { signUp } from "@/actions/actions";

type SignupProps = {
  handleClick: (e: any) => void;
};

export default function Signup(props: SignupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { handleClick } = props;

  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("something went wrong!");
      }
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const result = await signUp(undefined, formData);

    if (result?.errors) {
      const errors = result.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email[0],
        });
      }
      if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password[0],
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-[600px] mx-auto gap-5">
      Sign Up
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          className=" border-1 border-gray-300 rounded-2xl p-5"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className=" border-1 border-gray-300 rounded-2xl p-5"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="confirm password"
          className=" border-1 border-gray-300 rounded-2xl p-5"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <Button type="submit" disabled={isSubmitting} style={"primary"}>
          Sign Up
        </Button>
        <Button style={"secondary"} onClick={handleClick} value={"login"}>
          Already Have an account? Login
        </Button>
      </form>
    </div>
  );
}
