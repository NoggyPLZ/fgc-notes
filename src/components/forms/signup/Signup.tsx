"use client";

import Button from "../../ui/Button";
import { signUp } from "@/actions/actions";
import { useActionState } from "react";

type SignupProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Signup(props: SignupProps) {
  const [state, signUpAction, pending] = useActionState(signUp, undefined);

  const { handleClick } = props;

  return (
    <div className="flex flex-col mx-auto gap-5">
      <span className="font-semibold text-center text-2xl">Sign Up</span>
      <form action={signUpAction} className="flex flex-col gap-5">
        <input
          type="email"
          name="email"
          placeholder="email"
          className=" border-1 border-gray-300 rounded-2xl p-5"
          required
        />
        {state?.errors.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="password"
          className=" border-1 border-gray-300 rounded-2xl p-5"
          required
        />
        {state?.errors.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          className=" border-1 border-gray-300 rounded-2xl p-5"
          required
        />
        {state?.errors.confirmPassword && (
          <p className="text-red-500">{state.errors.confirmPassword}</p>
        )}
        <Button type="submit" disabled={pending} style={"primary"}>
          Sign Up
        </Button>
        <Button style={"secondary"} onClick={handleClick} value={"login"}>
          Already Have an account? Login
        </Button>
      </form>
    </div>
  );
}
