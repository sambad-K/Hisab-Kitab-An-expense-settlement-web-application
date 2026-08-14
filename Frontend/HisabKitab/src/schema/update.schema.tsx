import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const schema = z.object({
  first_name: z
    .string()
    .min(1, "Firstname must be at least 1 characters")
    .max(100, "Firstname too long"),
  last_name: z
    .string()
    .min(1, "Lastname must be at least 1 characters")
    .max(100, "Lastname too long"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(10, "Username length cannot exceed 10"),
  picture: z
    .instanceof(File, { message: "Please select an image" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image must be smaller than 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please enter file of correct format",
    })
    .optional(),
  email: z.email("Enter a valid email"),
});
export default schema;
export type UpdateSchemaValue = z.infer<typeof schema>;
