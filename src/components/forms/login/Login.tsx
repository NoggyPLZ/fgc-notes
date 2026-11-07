"use client";

import Button from "../../ui/Button";
import { useActionState } from "react";
import { login } from "@/actions/actions";

type LoginProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Login(props: LoginProps) {
  const [state, loginAction, isPending] = useActionState(login, undefined);

  const { handleClick } = props;

  return (
    <div className="flex flex-col mx-auto gap-5">
      <h2 className="bg-neutral-900 font-black text-neutral-100 text-3xl  p-3 border-l-4 border-l-rose-500">
        Login
      </h2>

      <form action={loginAction} className="flex flex-col p-4 gap-4">
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            id="email"
            placeholder="email"
            type="email"
            autoComplete="email"
            className=" border-1 border-gray-300 rounded-md p-2"
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            id="password"
            placeholder="password"
            type="password"
            autoComplete="current-password"
            className=" border-1 border-gray-300 rounded-md p-2"
          />
          {state?.errors?.password && (
            <p className="text-red-500">{state.errors.password}</p>
          )}
        </div>
        <Button type="submit" style={"primary"}>
          {isPending ? "Logging in..." : "Log In"}
        </Button>
        <Button style={"secondary"} onClick={handleClick} value={"forgot"}>
          Forgot password?
        </Button>
        <Button style={"secondary"} onClick={handleClick} value={"signup"}>
          Need an account? Sign up
        </Button>
      </form>
    </div>
  );
}
