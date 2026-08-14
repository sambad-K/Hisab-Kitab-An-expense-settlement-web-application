import { z } from "zod";
const schema = z
  .object({
    new_password: z
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
    confirm_password: z.string().min(8, "Enter confirm password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match, try again!",
    path: ["confirm_password"],
  });
export default schema;
export type ResetSchemaValue = z.infer<typeof schema>;
