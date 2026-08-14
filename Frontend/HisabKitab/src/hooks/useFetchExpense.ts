import { useQuery } from "@tanstack/react-query";
import { fetchExpense } from "@/api/fetch.expense.api";

const useFetchExpense = (id: number) => {
  const expense = useQuery({
    queryKey: ["expense", id],
    queryFn: () => fetchExpense(id),
  });
  return expense;
};

export default useFetchExpense;
