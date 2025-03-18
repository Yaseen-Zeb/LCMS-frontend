import { z } from "zod";

export const LawyerProfileUpdateFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone_number: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Must be at least 10 digits"),
  specialization: z
    .array(z.string())
    .min(1, "At least one specialization is required"),
  experience: z.coerce.number().min(0, "Experience must be a positive number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type ILawyerUpdateProfileForm = z.infer<
  typeof LawyerProfileUpdateFormSchema
>;

export const LawyerProfileUpdateFormDV: ILawyerUpdateProfileForm = {
  name: "",
  email: "",
  phone_number: "",
  specialization: [],
  experience: 0,
  address: "",
};
