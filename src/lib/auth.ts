"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./db";

const key = process.env.JWT_SECRET!;
const encodedKey = new TextEncoder().encode(key);

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey);
    return payload;
  } catch (error) {
    console.log("Error gettign session", error);
    return null;
  }
}

//GET THE USER HERE, ABOVE FUNCTION IS A HELPER SHHH DON'T .. DON'T TOUCH NO NO BAD DEVELOPER! STOP IT!
export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.userId) return null;
  const user = prisma.user.findUnique({
    where: {
      id: session.userId as string,
    },
    select: {
      id: true,
      name: true,
      votes: true,
      verified: true,
      role: true,
      avatarUrl: true,
    },
  });
  return user;
}
