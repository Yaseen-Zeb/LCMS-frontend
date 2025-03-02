import { z } from "zod";

export const ClientProfileUpdateFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone_number: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type IClientUpdateProfileForm = z.infer<typeof ClientProfileUpdateFormSchema>;

export const ClientProfileUpdateFormDV: IClientUpdateProfileForm = {
  name: "",
  email: "",
  phone_number: "",
  address: "",
};