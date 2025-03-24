import { z } from "zod";

export const MessageFormSchema = z.object({
  message: z.string().min(1, "").trim()
});

export type IMessageForm = z.infer<typeof MessageFormSchema>;

export const MessageFormDV: IMessageForm = {
  message: "",
};

export const ReviewFormSchema = z.object({
  message: z.string().min(1, "").trim()
});

export type IReviewForm = z.infer<typeof ReviewFormSchema>;

export const ReviewFormDV: IReviewForm = {
  message: "",
};
