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
    return null;
  }
}

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
    },
  });
  return user;
}
