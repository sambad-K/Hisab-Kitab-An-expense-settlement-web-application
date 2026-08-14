import api from "./axios";
import type { Expense } from "@/types/expense";
export const fetchExpense = async (id: number): Promise<Expense> => {
  const expense = await api.get(`/expense/getexpense/${id}/`);
  return expense.data[0];
};
