import { z } from "zod";
const schema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Enter password"),
});
export default schema;
export type LoginSchemaValue = z.infer<typeof schema>;
