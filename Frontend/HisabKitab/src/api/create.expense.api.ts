import api from "./axios";
import type { ExpenseSchemaOutputValue } from "@/schema/expense.schema";
export const createExpense = (data: ExpenseSchemaOutputValue, id: number) => {
  console.log(data);
  return api.post(`/expense/create/${id}/`, data);
};
