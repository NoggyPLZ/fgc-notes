import { Prisma, Votes } from "@prisma/client";
import z from "zod";
import { containsProfanity } from "./filter";

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
    email: z.email("Please enter a real email address").trim(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

const slugRegex = /^[a-z0-9-]{1,100}$/;

export const noteSchema = z.discriminatedUnion("category", [
  z.object({
    character: z.string().min(1),
    opponent: z.string().min(1),
    category: z.enum(["MATCHUPS"]),
    note: z
      .string()
      .trim()
      .min(5, "Note required to be at least 5 characters long")
      .max(2000, "Note too long")
      .regex(
        /^[\w\s.,!?'":;()<>[\]~+\-\u2190-\u2199\uFE0E\n\r]+$/,
        "Contains invalid characters"
      )
      .refine((val) => !containsProfanity(val), {
        message: "Your message contains prohibited words.",
      }),
    characterslug: z.string().regex(slugRegex),
    gameslug: z.string().regex(slugRegex),
  }),
  z.object({
    character: z.string().min(1),
    opponent: z.string().optional(),
    category: z.enum(["NEUTRAL", "COMBOS", "SETPLAY"]),
    note: z
      .string()
      .trim()
      .min(5, "Note required to be at least 5 characters long")
      .max(2000, "Note too long")
      .regex(
        /^[\w\s.,!?'":;()<>[\]~+\-\u2190-\u2199\uFE0E\n\r]+$/,
        "Contains invalid characters"
      )
      .refine((val) => !containsProfanity(val), {
        message: "Your message contains prohibited words.",
      }),
    characterslug: z.string().regex(slugRegex),
    gameslug: z.string().regex(slugRegex),
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

export type NoteWithUserAndVote = NoteWithUserSafe & {
  votes?: { value: number }[];
};

export const voteSchema = z.object({
  noteId: z.string().cuid(),
  value: z.coerce.number().refine((v): v is 1 | -1 => v === 1 || v === -1, {
    message: "Must be 1 (upvote) or -1 (downvote)",
  }),
});

export type TVoteSchema = {
  noteId: string;
  value: "1" | "-1";
};

export type TVoteSums = {
  _sum: {
    value: number | null;
  };
  noteId: string;
};

export const editNoteSchema = z.object({
  id: z.string(),
  content: z
    .string()
    .trim()
    .min(1, "Note required")
    .max(1000, "Note too long")
    .regex(
      /^[\w\s.,!?'":;()<>[\]~+\-\u2190-\u2199\uFE0E\n\r]+$/,
      "Contains invalid characters"
    )
    .refine((val) => !containsProfanity(val), {
      message: "Your message contains prohibited words.",
    }),
});

export type TEditNoteSchema = z.infer<typeof editNoteSchema>;

export type UserForProfile = {
  id: string;
  name: string;
  email?: string;
  createdAt?: Date;
  verified?: boolean;
  status?: "ACTIVE" | "DISABLED";
  votes?: Votes[];
  avatarUrl?: string | null;
};

export const changeNameSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(25, "Name must be under 25 characters")
    .regex(/^[a-zA-Z0-9 _-]+$/, {
      message:
        "Name can only contain alphanumeric characters, spaces, dashes, or underscores",
    }),
});

export type TChangeNameSchema = z.infer<typeof changeNameSchema>;

export const confirmEmailSchema = z.object({
  email: z.email({ message: "Must be a valid email" }).trim(),
});

export type TConfirmEmailSchema = z.infer<typeof confirmEmailSchema>;

export const newPasswordSchema = z
  .object({
    userId: z.string(),
    resetId: z.string(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TNewPasswordSchema = z.infer<typeof newPasswordSchema>;

export const reportSchema = z.object({
  noteId: z.string().cuid(),
  reason: z.enum(["harrassment", "racism", "sexual"]),
  info: z
    .string()
    .trim()
    .min(5, "Be a little more descriptive 5 characters is too little")
    .max(200, "A little too descriptive, keep the message under 200 characters")
    .regex(/^[\w\s.,!?'":;()\-]+$/, "Contains invalid characters"),
});

export type TReportSchema = z.infer<typeof reportSchema>;

export type RecentNote = Prisma.NoteGetPayload<{
  include: {
    Character: {
      select: {
        slug: true;
        name: true;
        Game: {
          select: {
            slug: true;
          };
        };
      };
    };
    Opponent: {
      select: {
        slug: true;
        name: true;
      };
    };
  };
}>;

export type ReportWithNoteSafe = Prisma.ReportsGetPayload<{
  include: {
    Note: {
      include: {
        User: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
    reporter: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export const newsPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title too small, need more than 3 characters")
    .max(100, "Title too long, keep under 100 characters"),
  content: z
    .string()
    .trim()
    .min(3, "Content needs something")
    .max(1000, "Try and keep it under 1000 characters"),
});

export type TNewsPostSchema = z.infer<typeof newsPostSchema>;

export const searchSchema = z.object({
  query: z
    .string()
    .max(100)
    .regex(/^[a-zA-Z0-9 .]*$/, "Invalid characters, keep it to alphanumeric")
    .refine((val) => val === "" || val.length >= 3, {
      message: "Type at least 3 characters",
    }),
});

export type TSearchSchema = z.infer<typeof searchSchema>;

export const avatarUrlSchema = z
  .string()
  .regex(/^\/character-icons\/.*\.(png|webp|jpg|gif)$/, {
    message: "Invalid avatar path",
  });

export const removeReportSchema = z.string().cuid();

export type TRemoveReportSchema = z.infer<typeof removeReportSchema>;

export const reportBugSchema = z.object({
  category: z.enum([
    "UI",
    "UX",
    "PERFORMANCE",
    "FUNCTIONALITY",
    "DATA",
    "AUTH",
    "NETWORK",
    "ACCESSIBILITY",
    "OTHER",
  ]),
  content: z
    .string()
    .trim()
    .min(5, "Try to be more descriptive. More than a word or two")
    .max(1000, "Try to keep it under 1000 characters"),
});

export type TReportBugSchema = z.infer<typeof reportBugSchema>;
