import api from "./axios";
import type { ExpensePerMember } from "@/types/expensepermember";

export const fetchExpensePerMember = async (id?: number): Promise<ExpensePerMember[]> => {
  const members = await api.get(`/expense/get-expense-per/${id}/`);
  return members.data;
};
