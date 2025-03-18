import { z } from "zod";

export const FeedbackFormSchema = z.object({
  name: z.string().min(1, "Please enter your name.").trim(),
  email: z
    .string()
    .min(1, "Please enter your email address.")
    .trim()
    .email("Please enter a valid email address."),
  message: z.string().min(1, "Message is required").trim(),
});

export type IFeedBackForm = z.infer<typeof FeedbackFormSchema>;

export const FeedbackFormDV: IFeedBackForm = {
  name: "",
  email: "",
  message: "",
};
