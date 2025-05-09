import { z } from "zod";
const MAX_UPLOAD_SIZE = 3 * 1024 * 1024;
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
  experience: z.coerce.number().min(1, "Experience is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  bio: z.string().optional(),

  profile_picture: z
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "File must be a PNG or JPG/JPEG"
    ),

  certificate: z.instanceof(File, { message: "Certificate file is required" }),

  // 🆕 New Fields
  cnic: z
    .string()
    .min(13, "CNIC must be 13 digits")
    .regex(/^\d+$/, "CNIC must contain only digits"),

  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),

  languages_spoken: z.string().min(1, "Languages Spoken is required"),

  website_or_social: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
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

  // Defaults for new fields
  cnic: "",
  gender: undefined,
  languages_spoken: "",
  website_or_social: "",
  bio: "",
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
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "File must be a PNG or JPG/JPEG"
    ),

  cnic: z
    .string()
    .min(13, "CNIC must be at least 13 digits")
    .regex(/^\d+$/, "CNIC must contain only digits"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  city: z.string().min(1, "City is required"),
  profession: z.string().min(1, "Profession is required"),
  languages_spoken: z.string().min(1, "Languages Spoken is required"),
});

export type IClientRegisterForm = z.infer<typeof ClientRegisterFormSchema>;

export const ClientRegisterFormDV: Partial<IClientRegisterForm> = {
  name: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  profile_picture: undefined,
  cnic: "",
  gender: undefined,
  city: "",
  profession: "",
  languages_spoken: "",
};

export const ChangePasswordFormSchema = z
  .object({
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
