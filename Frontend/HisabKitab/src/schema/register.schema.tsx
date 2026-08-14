import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const schema = z
  .object({
    first_name: z
      .string()
      .min(1, "Firstname must be at least 1 characters")
      .max(100, "Firstname too lobg"),
    last_name: z
      .string()
      .min(1, "Lastname must be at least 1 characters")
      .max(100, "Lastname too long"),
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(10, "Username cannot exceed length of 10"),
    picture: z
      .instanceof(File, { message: "Please select an image" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "Image must be smaller than 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Please enter file of correct format",
      }),
    email: z.email("Enter a valid email"),
    password1: z
      .string()
      .min(8, "Password must be 8 characters long")
      .refine((value) => /[a-z]/.test(value), {
        message: "Enter at least 1 lowercase",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Enter at least 1 uppercase",
      })
      .refine((value) => /\d/.test(value), {
        message: "Enter at least one number",
      })
      .refine((value) => /[!@#$%^&*(),.?":|<>}]/.test(value), {
        message: "Enter at least 1 character",
      }),
    password2: z.string().min(8, "Enter confirm password"),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });
export default schema;
export type RegisterSchemaValue = z.infer<typeof schema>;
