import * as z from "zod";

export const NoteSchema = z.object({
  title: z.string().min(1),
  text: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const SignupSchema = z
  .object({
    name: z.string().min(3, "Name is require"),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
