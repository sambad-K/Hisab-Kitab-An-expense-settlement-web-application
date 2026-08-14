import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteExpense } from "@/api/delete.expense.api";
import { toast } from "sonner";
import axios from "axios";
const useDeleteExpense = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expense"],
      });

      queryClient.invalidateQueries({
        queryKey: ["expense-per-member"],
      });
      toast.success("Deleted the Expense");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(`Failed to delete group}`);
      }
    },
  });
  return { mutate };
};

export default useDeleteExpense;
