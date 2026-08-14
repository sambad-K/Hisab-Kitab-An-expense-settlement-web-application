import { z } from "zod";
const schema = z.object({
  group_name: z
    .string("Please provide a valid input")
    .min(1, "Dont deave the group name empty")
    .max(50, "Groupname cannot exceed more than 50 characters"),
  description: z
    .string("Please provide a valid input")
    .min(1, "Leave at least a small description")
    .max(100, "Description length too much, make it shoer !"),
});
export default schema;
export type GroupSchemaValue = z.infer<typeof schema>;
