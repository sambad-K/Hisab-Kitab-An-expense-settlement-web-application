import { z } from "zod";
const schema = z.object({
  category: z
    .string("Please give valid input")
    .min(1, "Dont leave the category field empty")
    .max(50, "Category cannot exceed more than 50 characters"),
  split_type: z
    .string("Please give valid input")
    .min(1, "Leave at least a small description")
    .max(100, "Description length too much, make it shoer !"),
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(100000, "Amount cannot exceed 100000"),
});
export default schema;
export type ExpenseSchemaInputValue = z.input<typeof schema>;
export type ExpenseSchemaOutputValue = z.output<typeof schema>;
