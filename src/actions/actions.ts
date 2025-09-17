"use server";
import z from "zod";
import {
  changeNameSchema,
  confirmEmailSchema,
  editNoteSchema,
  loginSchema,
  newPasswordSchema,
  noteSchema,
  reportSchema,
  signUpSchema,
  voteSchema,
} from "@/lib/types";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import crypto from "crypto";

const testUser = {
  id: "1",
  email: "contact@contact.com",
  password: "1234567890",
};

//LOGIN FUNCTION
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

//SIGNOUT FUNCTION
export async function logout() {
  await deleteSession();
  redirect("/");
}

//SIGNUP FUNCTION
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

type NoteErrors = {
  character?: string[];
  opponent?: string[];
  category?: string[];
  note?: string[];
  user?: string[];
};

//NOTE SUBMISSION FUNCTION
export async function noteSubmit(prevState: any, formData: FormData) {
  console.log("checking against type schema...");
  const results = noteSchema.safeParse(Object.fromEntries(formData));
  console.log("checking results...");
  if (!results.success) {
    const flat = z.flattenError(results.error);
    console.log(flat.fieldErrors);
    return {
      errors: flat.fieldErrors as NoteErrors,
    };
  }
  console.log("validation passed.");
  const { character, category, note, opponent, characterslug, gameslug } =
    results.data;
  const user = await getCurrentUser();

  if (!user) {
    return {
      errors: {
        user: ["User not found"],
      },
    };
  }

  try {
    await prisma.note.create({
      data: {
        content: note,
        characterId: character,
        userId: user.id,
        category: category,
        ...(opponent ? { opponentId: opponent } : {}),
      },
    });
    revalidatePath(`/select/${gameslug}/${characterslug}`);
  } catch (error) {
    console.log("Error making note:", error);
  }
}

//UPVOTE/DOWNVOTE ACTION
export async function voteHandle(voteEntry: any) {
  console.log("starting vote validation...");
  const results = voteSchema.safeParse(voteEntry);

  if (!results.success) {
    const flat = z.flattenError(results.error);
    console.log(flat);
    return {
      errors: flat.fieldErrors,
    };
  }

  const { value, noteId } = results.data;
  console.log("The vote passed validation");
  const user = await getCurrentUser();
  if (!user) {
    return {
      errors: ["no logged in user found"],
    };
  }
  console.log("user found");

  const userVote = user.votes.find((vote) => vote.noteId === noteId);

  // console.log(user.votes);
  console.log("Note id: ", noteId);
  console.log(userVote);
  if (userVote && userVote.value === value) {
    console.log("userVote value: ", userVote.value);
    console.log("value: ", value);
    try {
      console.log("DELETING RECORD");
      await prisma.votes.delete({
        where: {
          id: userVote.id,
        },
      });
      const newRating = await prisma.votes.aggregate({
        where: {
          noteId,
        },
        _sum: { value: true },
      });
      await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          rating: newRating._sum.value ?? 0,
        },
      });
    } catch (error) {
      console.log("Error deleting vote ", error);
    }
  } else {
    try {
      console.log("UPDATING OR INSERTING VOTE ", value);
      await prisma.votes.upsert({
        where: {
          userId_noteId: { userId: user.id, noteId },
        },
        update: {
          value: value,
        },
        create: {
          userId: user.id,
          noteId: noteId,
          value: value,
        },
      });
      const newRating = await prisma.votes.aggregate({
        where: {
          noteId,
        },
        _sum: { value: true },
      });
      console.log("new rating: ", newRating._sum.value);
      await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          rating: newRating._sum.value ?? 0,
        },
      });
    } catch (error) {
      console.log("Error updating/inserting vote ", error);
    }
  }
}

//EDIT NOTE FUNCTION
export async function editSubmit(prevState: any, formData: FormData) {
  console.log("checking against edit schema...");
  console.log(Object.fromEntries(formData));
  const results = editNoteSchema.safeParse(Object.fromEntries(formData));
  console.log("checking results...");
  if (!results.success) {
    const flat = z.flattenError(results.error);
    console.log(flat.fieldErrors);
    return {
      errors: flat.fieldErrors,
    };
  }

  const { id, content } = results.data;

  const noteForPath = await prisma.note.findUnique({
    where: {
      id: id,
    },
    select: {
      Character: {
        select: {
          slug: true,
          Game: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!noteForPath) {
    console.log("No note found...");
  }

  try {
    await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    });
    console.log("revalidate...");
    revalidatePath(
      `/select/${noteForPath?.Character.slug}/${noteForPath?.Character.Game.slug}`
    );
    console.log("ravlidated.");
    return { success: true };
  } catch (error) {
    console.log("Failed to update note: ", error);
  }
}

//CHANGE NAME FUNCTION
export async function editName(prevState: any, formData: FormData) {
  console.log("Name change validation starting...");
  const results = changeNameSchema.safeParse(Object.fromEntries(formData));
  console.log("Name change passed validation...");

  if (!results.success) {
    const flat = z.flattenError(results.error);
    console.log(flat.fieldErrors);
    return {
      errors: flat.fieldErrors,
    };
  }

  const { id, name } = results.data;

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    revalidatePath(`/user/${id}`);
    return { success: true };
  } catch (error) {
    console.log("Failed to update name: ", error);
  }
}

export type VerifyActionType = {
  success?: boolean;
  message?: string;
};

//SEND VERIFICATION EMAIL
export async function sendVerifyEmail(prevState: any, formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log("Email verification action pew");

  const token = crypto.randomBytes(32).toString("hex");
  const hashedVerify = await bcrypt.hash(token, 12);

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "No user is logged in." };
  }

  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bhicksdesigndev@gmail.com",
      subject: "test",
      html: `<p>To verify your account, follow the link <a href="http://localhost:3000/verify/${token}">to verify your account</a></p>`,
    });

    await prisma.verfication.create({
      data: {
        userId: user.id,
        token: hashedVerify,
        expiresAt,
      },
    });
    console.log(`Email sent `, data);
    return { success: true, message: "Email sent!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send email." };
  }
}

//ACTION TO RESET PASSWORD FROM FORM
export async function confirmEmailForPW(prevState: any, formData: FormData) {
  console.log("confirming email...");
  const results = confirmEmailSchema.safeParse(Object.fromEntries(formData));
  console.log(results);
  if (!results.success) {
    const flat = z.flattenError(results.error);
    console.log(flat.fieldErrors);
    return {
      errors: flat.fieldErrors,
    };
  }

  console.log("passed verification, onto gathering data for email...");

  const { email } = results.data;

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 12);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    return {
      errors: {
        email: ["No user found"],
      },
    };
  }

  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt,
      },
    });
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bhicksdesigndev@gmail.com",
      subject: "Password Reset Request",
      html: `<p>A password reset was requested for this email. <a href="http://localhost:3000/reset/${token}?user=${user.id}">Click here to reset password</a>. If you didn't request this, please disregard</p>`,
    });
  } catch (error) {
    console.log("Errors: ", error);
  }
}

export async function setNewPassword(prevState: any, formData: FormData) {
  console.log("Starting password reset...");
  const results = newPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!results.success) {
    const flat = z.flattenError(results.error);
    console.log(flat.fieldErrors);
    return {
      errors: flat.fieldErrors,
    };
  }

  const { password, resetId, userId } = results.data;

  const hashedToken = await prisma.passwordReset.findFirst({
    where: {
      userId,
    },
  });

  if (!hashedToken) {
    return {
      errors: {
        password: "Token is expired or missing",
      },
    };
  }

  const isMatch = bcrypt.compare(resetId, hashedToken.token);

  if (!isMatch) {
    return {
      errors: {
        password: ["No user found or reset token exired"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.passwordReset.delete({
      where: {
        token: hashedToken.token,
      },
    });
  } catch (error) {
    console.log("Failed to reset password: ", error);
    return {
      errors: {
        password: [`Failed to reset password: ${error}`],
      },
    };
  }
}

export async function reportAction(prevState: any, formData: FormData) {
  const results = reportSchema.safeParse(Object.fromEntries(formData));
  if (!results.success) {
    const flat = z.flattenError(results.error);
    return {
      errors: flat.fieldErrors,
    };
  }

  const user = await getCurrentUser();
  if (!user || !user.verified) {
    return {
      errors: {
        user: ["User not logged in, or not verified."],
      },
    };
  }

  const { noteId, reason, info } = results.data;

  try {
    await prisma.reports.create({
      data: {
        reportedBy: user.id,
        noteId,
        reason,
        info,
      },
    });
  } catch (error) {
    console.log("Failed to make a report: ", error);
  }
}
