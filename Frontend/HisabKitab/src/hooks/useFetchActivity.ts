import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchActivity } from "@/api/fetch.activity.api";
const useFetchActivity = (page: number, q: string, type: string) => {
  return useQuery({
    queryKey: ["activity", page, q, type],
    queryFn: () => fetchActivity(page, q, type),
    placeholderData: keepPreviousData,
  });
};

export default useFetchActivity;
