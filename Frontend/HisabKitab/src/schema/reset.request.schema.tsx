import { z } from "zod";
const schema = z.object({
  email: z.email("Enter a valid email"),
});
export default schema;
export type ResetRequestSchemaValue = z.infer<typeof schema>;
