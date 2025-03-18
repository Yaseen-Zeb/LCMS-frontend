import { z } from "zod";
const MAX_UPLOAD_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const UpdateProfileImageSchema = z.object({
profile_picture: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, "File size must be less than 3MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "File must be a PNG or JPG/JPEG"),
});

export type IUpdateProfileImageForm = z.infer<typeof UpdateProfileImageSchema>;

export const UpdateProfileImageFormDV: Partial<IUpdateProfileImageForm> = {
  profile_picture: undefined, 
};