import { useQuery } from "@tanstack/react-query";
import { fetchExpensePerMember } from "@/api/fetch.expensemember.api";

const useFetchExpensePerMember = (id: number) => {
  const members = useQuery({
    queryKey: ["expense-per-member", id],
    queryFn: () => fetchExpensePerMember(id),
  });

  return members;
};

export default useFetchExpensePerMember;
