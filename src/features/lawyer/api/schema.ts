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
  bio: z.string().optional(),
  cnic: z
  .string()
  .min(13, "CNIC must be 13 digits")
  .regex(/^\d+$/, "CNIC must contain only digits"),

gender: z.string().min(1, "Gender is required"),

languages_spoken: z.string().min(1, "Languages Spoken is required"),

website_or_social: z
  .string()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal("")),
});

export type ILawyerUpdateProfileForm = z.infer<
  typeof LawyerProfileUpdateFormSchema
>;

export const LawyerProfileUpdateFormDV: ILawyerUpdateProfileForm = {
  name: "",
  email: "",
  cnic:"",
  gender:"",
  languages_spoken:"",
  website_or_social:"",
  phone_number: "",
  specialization: [],
  experience: 0,
  address: "",
  bio: "",
};
