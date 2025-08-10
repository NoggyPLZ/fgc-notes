"use server";
import z from "zod";
import { loginSchema } from "@/lib/types";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "contact@contact.com",
  password: "1234567890",
};

export async function login(prevState: any, formData: FormData) {
  console.log("running check now...");
  console.log(formData);
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  console.log("check for result finished...");
  console.log(result);
  if (!result.success) {
    const flat = z.flattenError(result.error);
    return {
      errors: flat.fieldErrors,
    };
  }

  console.log("more check...");
  const { email, password } = result.data;
  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  console.log("all good...");
  await createSession(testUser.id);
  console.log("redirect coming...");
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
