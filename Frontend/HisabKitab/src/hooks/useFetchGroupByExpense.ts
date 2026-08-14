import { useQuery } from "@tanstack/react-query";
import { fetchGroupByExpense } from "@/api/fetch.group.by.expense.api";

const useFetchGroupByExpense = (id: number) => {
  const group = useQuery({
    queryKey: ["group-by-expense", id],
    queryFn: () => fetchGroupByExpense(id),
  });
  return { group };
};

export default useFetchGroupByExpense;
