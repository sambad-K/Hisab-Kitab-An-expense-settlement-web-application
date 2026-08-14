import type { Member } from "./member";
import type { Expense } from "./expense";
export type ExpensePerMember = {
  id: number;
  group_member: Member;
  paid_amount: number;
  share_amount: number;
  expense: Expense;
  percent?: number;
  created_at: number;
  updated_at: number;
};
