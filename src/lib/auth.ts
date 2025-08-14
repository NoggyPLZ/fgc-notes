import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./db";

const key = process.env.JWT_SECRET!;
const encodedKey = new TextEncoder().encode(key);

let cachedUser: any = null;
let cachedSession: any = null;

export async function getSession() {
  if (cachedSession) return cachedSession;
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey);
    cachedSession = payload;
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  if (cachedUser) return cachedUser;
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
  cachedUser = user;
  return user;
}
