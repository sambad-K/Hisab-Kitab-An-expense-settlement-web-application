import { z } from "zod";
const schema = z.object({
  paid_amount: z.coerce.number("Amount must be in number.").max(100000, "Max limit reached, you can enter upto 100000"),
  share_amount: z.coerce.number("Amount must be in number").max(100000, "Max limit reached, you can enter upto 100000"),
  percent: z.preprocess(
    (value) => Number(value),
    z.number().max(100, "Percentage must not exceed 100")
  ),
});
export default schema;
export type ExpensePerMemberSchemaInputValue = z.input<typeof schema>;
export type ExpensePerMemberSchemaOutputValue = z.output<typeof schema>;
