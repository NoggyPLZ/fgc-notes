"use client";

import { setNewPassword } from "@/actions/actions";
import Button from "@/components/ui/Button";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NewPass({
  resetId,
  userId,
}: {
  resetId: string;
  userId: string;
}) {
  const router = useRouter();
  const [state, setNewPasswordAction, pending] = useActionState(
    setNewPassword,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state?.success, router]);

  return (
    <form
      action={setNewPasswordAction}
      className="w-[600px] flex flex-col p-5 rounded-2xl mx-auto gap-5 dark:bg-gray-800 bg-gray-300"
    >
      <input name="resetId" defaultValue={resetId} type="hidden" />
      <input name="userId" defaultValue={userId} type="hidden" />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        className=" border-1 border-gray-300 rounded-2xl p-5"
        type="password"
      />
      {state?.errors.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        name="confirmPassword"
        className=" border-1 border-gray-300 rounded-2xl p-5"
        type="password"
      />
      {state?.errors.confirmPassword && (
        <p className="text-red-500">{state.errors.confirmPassword}</p>
      )}
      <Button style="primary" type="submit" disabled={pending}>
        Submit
      </Button>
    </form>
  );
}
