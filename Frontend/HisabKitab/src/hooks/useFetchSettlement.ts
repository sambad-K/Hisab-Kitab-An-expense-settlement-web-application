import { useQuery } from "@tanstack/react-query";
import { fetchSettlement } from "@/api/fetch.settlement.api";

const useFetchSettlement = (id: number) => {
  const settlement = useQuery({
    queryKey: ["settlement", id],
    queryFn: () => fetchSettlement(id),
  });
  return { settlement };
};

export default useFetchSettlement;
