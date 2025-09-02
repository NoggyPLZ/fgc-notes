"use server";
import z from "zod";
import {
  changeNameSchema,
  editNoteSchema,
  loginSchema,
  noteSchema,
  signUpSchema,
  voteSchema,
} from "@/lib/types";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

type NoteErrors = {
  character?: string[];
  opponent?: string[];
  category?: string[];
  note?: string[];
  user?: string[];
};

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
    revalidatePath(
      `/select/${noteForPath?.Character.slug}/${noteForPath?.Character.Game.slug}`
    );
    return { success: true };
  } catch (error) {
    console.log("Failed to update note: ", error);
  }
}

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
