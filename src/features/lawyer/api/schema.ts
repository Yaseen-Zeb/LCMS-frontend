import { z } from "zod";

export const CaseFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title cannot exceed 255 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  expertise_required: z
    .array(z.string())
    .min(1, "At least one expertise is required"),

  case_category: z.string().min(1, "Case Category is required"),

  urgency: z.string().min(1, "Urgency is required"),

  budget_type: z.string().min(1, "Budget Type is required"),

  budget_amount: z.coerce.number().min(1, "Budget is required"),

  location: z
    .string()
    .min(1, "Location is required")
    .max(255, "Location cannot exceed 255 characters"),
});

export type ICaseForm = z.infer<typeof CaseFormSchema>;

export const CaseFormDV: ICaseForm = {
  title: "",
  description: "",
  expertise_required: [],
  case_category: "",
  urgency: "",
  budget_type: "",
  budget_amount: 0,
  location: "",
};

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

export type ILawyerUpdateProfileForm = z.infer<typeof LawyerProfileUpdateFormSchema>;

export const LawyerProfileUpdateFormDV: ILawyerUpdateProfileForm = {
  name: "",
  email: "",
  phone_number: "",
  specialization: [],
  experience: 0,
  address: "",
};
