"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { signUp } from "@/actions/actions";
import { reCaptchaToken } from "@/lib/recaptcha";
import { useRouter } from "next/navigation";

type SignupProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Signup(props: SignupProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { handleClick } = props;

  const onSubmit = async (data: TSignUpSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const token = await reCaptchaToken();
    if (!token) {
      console.log("Error with token");
      return;
    }

    const result = await signUp(token, formData);

    if (result.errors) {
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
      if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword[0],
        });
      }
    }
    if (result.success) {
      router.push("/dashboard/");
    }
  };

  return (
    <div className="flex flex-col mx-auto gap-5">
      <span className="font-semibold text-center text-2xl">Sign Up</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input
          {...register("email")}
          type="email"
          name="email"
          placeholder="email"
          className=" border-1 border-gray-300 rounded-2xl p-5"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register("password")}
          type="password"
          name="password"
          placeholder="password"
          className=" border-1 border-gray-300 rounded-2xl p-5"
          required
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          {...register("confirmPassword")}
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          className=" border-1 border-gray-300 rounded-2xl p-5"
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <div className="text-sm">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            className="text-cyan-500"
            href="https://policies.google.com/privacy"
            target="_blank"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            className="text-cyan-500"
            href="https://policies.google.com/terms"
            target="_blank"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>
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
