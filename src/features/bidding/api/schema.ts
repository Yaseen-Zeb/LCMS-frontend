import { z } from "zod";

export const BiddingFormSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required.") // More accurate message
    .min(10, "Description must be at least 10 characters."),
});

export type IBiddingForm = z.infer<typeof BiddingFormSchema>;

export const BiddingFormDV: IBiddingForm = {
  description: "",
};

