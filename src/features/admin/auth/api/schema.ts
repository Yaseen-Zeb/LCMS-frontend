import { z } from "zod";

export const LogInFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address.")
    .trim()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Please enter your password.")
    .trim(),
});

export type ILoginForm = z.infer<typeof LogInFormSchema>;

export const LoginFormDV: ILoginForm = {
  email: "",
  password: "",
};
