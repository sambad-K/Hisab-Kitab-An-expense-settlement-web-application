export type UpdateExpenseProps = {
  id: number;
  category: string;
  split_type: string;
  amount: number;
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
};
