import { z } from "zod";
const MAX_UPLOAD_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const LogInFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address.")
    .trim()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Please enter your password.")
    .min(5, "Password must be at least 5 characters long.")
    .trim(),
});

export type ILoginForm = z.infer<typeof LogInFormSchema>;

export const LoginFormDV: ILoginForm = {
  email: "",
  password: "",
};

export const LawyerRegisterFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone_number: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Must be at least 10 digits"),
  specialization: z
    .array(z.string())
    .min(1, "At least one specialization is required"),
  experience: z.coerce.number().min(0, "Experience must be a positive number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  profile_picture: z
    .instanceof(File, { message: "File is required" }) // Ensure it's a File instance
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, "File size must be less than 3MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "File must be a PNG or JPG/JPEG"),
  certificate: z.instanceof(File, { message: "Certificate file is required" }),
});

export type ILawyerRegisterForm = z.infer<typeof LawyerRegisterFormSchema>;

export const LawyerRegisterFormDV: Partial<ILawyerRegisterForm> = {
  name: "",
  email: "",
  password: "",
  phone_number: "",
  specialization: [],
  experience: 0,
  address: "",
  profile_picture: undefined,
  certificate: undefined,
};




export const ClientRegisterFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone_number: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  profile_picture: z
    .instanceof(File, { message: "File is required" }) // Ensure it's a File instance
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, "File size must be less than 3MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "File must be a PNG or JPG/JPEG"),
});

export type IClientRegisterForm = z.infer<typeof ClientRegisterFormSchema>;

export const ClientRegisterFormDV: Partial<IClientRegisterForm> = {
  name: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  profile_picture: undefined, 
};


export const ChangePasswordFormSchema = z.object({
  oldPassword: z
    .string()
    .min(1, "Please enter your current password.")
    .min(5, "Password must be at least 5 characters long.")
    .trim(),

  newPassword: z
    .string()
    .min(1, "Please enter a new password.")
    .min(5, "Password must be at least 5 characters long.")
    .trim(),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your new password.")
    .min(5, "Password must be at least 5 characters long.")
    .trim(),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type IChangePasswordForm = z.infer<typeof ChangePasswordFormSchema>;

export const ChangePasswordFormDV: IChangePasswordForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
