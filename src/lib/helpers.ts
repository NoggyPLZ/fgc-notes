"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "./auth";
import bcrypt from "bcryptjs";

export async function verificationProcess(verifyId: string): Promise<{
  success: boolean;
  message: string;
}> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      message: "No user logged in.",
    };
  }

  const verificationEntry = await prisma.verfication.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!verificationEntry) {
    return {
      success: false,
      message: "No verification entry found",
    };
  }

  const isMatch = await bcrypt.compare(verifyId, verificationEntry.token);

  if (!isMatch) {
    return {
      success: false,
      message: "Verification entry is invalid or expired",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });
    await prisma.verfication.delete({
      where: {
        userId: user.id,
      },
    });
    return {
      success: true,
      message: "Successfully verified!",
    };
  } catch (error) {
    console.log("Verification process failed");
    return {
      success: false,
      message: `Verification failed ${error}`,
    };
  }
}
