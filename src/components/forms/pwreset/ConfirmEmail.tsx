"use client";

import Button from "@/components/ui/Button";
import { confirmEmailForPW } from "@/actions/actions";
import { useActionState } from "react";

export default function ConfirmEmail({
  handleClick,
}: {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [state, confirmEmailForPWAction, pending] = useActionState(
    confirmEmailForPW,
    undefined
  );

  return (
    <form
      action={confirmEmailForPWAction}
      className="flex flex-col p-5 rounded-2xl mx-auto gap-5"
    >
      <label htmlFor="email">Email used:</label>
      <input
        name="email"
        placeholder=""
        className=" border-1 border-gray-300 rounded-2xl p-5"
      />
      {state?.errors.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      {state?.success && (
        <p className="text-cyan-500 font-bold text-center">
          Password reset link sent to the email provided.
        </p>
      )}
      <Button style="primary" type="submit" disabled={pending}>
        Submit
      </Button>
      <Button style={"secondary"} onClick={handleClick} value={"login"}>
        Remembered password? Login
      </Button>
    </form>
  );
}
