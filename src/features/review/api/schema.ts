import { z } from "zod";

export const ReviewFormSchema = z.object({
  rating: z.number(),
  message: z.string().min(1, "Please write review").trim(),
});

export type IReviewForm = z.infer<typeof ReviewFormSchema>;

export const ReviewFormDV: IReviewForm = {
  rating: 5,
  message: "",
};
