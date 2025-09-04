"use client";

import { sendVerifyEmail } from "@/actions/actions";
import Button from "../ui/Button";
import { useActionState } from "react";

type VerifyActionType = {
  success: boolean;
  message?: string;
};

export default function VerifyEmail() {
  const [state, verifyAction, isSubmitting] = useActionState<
    VerifyActionType,
    FormData
  >(sendVerifyEmail, { success: false, message: "" });
  return (
    <form action={verifyAction} className="pt-3">
      <Button style="primary" type="submit" disabled={isSubmitting}>
        Veryify Email
      </Button>
      {state.success && <p className="text-green-500">{state.message}</p>}
      {!state.success && state.message && (
        <p className="text-red-500">{state.message}</p>
      )}
    </form>
  );
}
