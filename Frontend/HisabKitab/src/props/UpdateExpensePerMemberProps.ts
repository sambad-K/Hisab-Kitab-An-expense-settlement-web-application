import type { Expense } from "../types/expense";
export type UpdateExpensePerMemberProps = {
  id: number;
  paid_amount: number;
  share_amount: number;
  expense: Expense;
  percent?: number;
  created_at?: number;
  updated_at?: number;
  gid?: number;
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
};
