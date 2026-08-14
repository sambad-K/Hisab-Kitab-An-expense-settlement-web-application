import api from "./axios";
import type { ExpensePerMemberSchemaOutputValue } from "@/schema/expense.per.member.schema";
export const updateExpensePerMember = async (
  id: number,
  data: Partial<ExpensePerMemberSchemaOutputValue>
) => {
  const response = await api.patch(`/expense/updateexpenseper/${id}/`, data);
  return response.data;
};
