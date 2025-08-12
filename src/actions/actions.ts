"use server";
import z from "zod";
import { loginSchema, signUpSchema } from "@/lib/types";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

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

  console.log("Input is correct shape, now lets find it in the db...");

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  const passCompare = await bcrypt.compare(password, user.password);

  if (!passCompare) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  console.log("all good...");
  await createSession(user.id);
  console.log("redirect coming...");
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export async function signUp(prevState: any, formData: FormData) {
  console.log("Beginning sign up validation");
  const result = signUpSchema.safeParse(Object.fromEntries(formData));

  console.log("schema check complete, moving to errors if any...");
  if (!result.success) {
    const flat = z.flattenError(result.error);
    return {
      errors: flat.fieldErrors,
    };
  }

  console.log("No immediate errors moving on...");
  const { email, password } = result.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailCheck = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (emailCheck) {
    console.log("email exists");
    return {
      errors: {
        email: ["Email already exists."],
      },
    };
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: email,
        email: email,
        password: hashedPassword,
      },
    });

    await createSession(user.id);
  } catch (error) {
    console.log("Error:", error);
  }
  redirect("/dashboard");
}
