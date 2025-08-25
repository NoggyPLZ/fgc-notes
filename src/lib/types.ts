import { Prisma } from "@prisma/client";
import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .trim(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: z.email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const noteSchema = z.discriminatedUnion("category", [
  z.object({
    character: z.string(),
    opponent: z.string(),
    category: z.enum(["MATCHUPS"]),
    note: z.string(),
    characterslug: z.string(),
    gameslug: z.string(),
  }),
  z.object({
    character: z.string(),
    opponent: z.string().optional(),
    category: z.enum(["NEUTRAL", "COMBOS", "SETPLAY"]),
    note: z.string(),
    characterslug: z.string(),
    gameslug: z.string(),
  }),
]);

export type TNoteSchema = z.infer<typeof noteSchema>;

export type NoteWithUserSafe = Prisma.NoteGetPayload<{
  include: {
    User: {
      select: { id: true; name: true };
    };
  };
}>;

export const voteSchema = z.object({
  noteId: z.string().cuid(),
  value: z.coerce.number().refine((v): v is 1 | -1 => v === 1 || v === -1, {
    message: "Must be 1 (upvote) or -1 (downvote)",
  }),
});

export type TVoteSchema = z.infer<typeof voteSchema>;

export type TVoteSums = {
  _sum: {
    value: number | null;
  };
  noteId: string;
};
