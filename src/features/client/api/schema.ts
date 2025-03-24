import { z } from "zod";

export const ClientProfileUpdateFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone_number: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  cnic: z
    .string()
    .min(13, "CNIC must be at least 13 digits")
    .regex(/^\d+$/, "CNIC must contain only digits"),
  gender: z.string().min(1, "Gender is required"),
  city: z.string().min(1, "City is required"),
  profession: z.string().min(1, "Profession is required"),
  languages_spoken: z.string().min(1, "Languages Spoken is required"),
});

export type IClientUpdateProfileForm = z.infer<
  typeof ClientProfileUpdateFormSchema
>;

export const ClientProfileUpdateFormDV: IClientUpdateProfileForm = {
  name: "",
  email: "",
  phone_number: "",
  address: "",
  cnic: "",
  gender: "",
  city: "",
  profession: "",
  languages_spoken: "",
};

export const AcceptBidSchema = z.object({
  message: z.string().min(15, "First message must be at least 15 characters"),
});

export type IAcceptBidForm = z.infer<typeof AcceptBidSchema>;

export const AcceptBidFormDV: IAcceptBidForm = {
  message: "",
};
