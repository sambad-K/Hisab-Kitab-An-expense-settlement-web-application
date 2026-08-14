import api from "./axios";
import type { ExpenseSchemaOutputValue } from "@/schema/expense.schema";
export const updateExpense = async (id: number, data: Partial<ExpenseSchemaOutputValue>) => {
  const response = await api.patch(`/expense/update/${id}/`, data);
  return response.data;
};
