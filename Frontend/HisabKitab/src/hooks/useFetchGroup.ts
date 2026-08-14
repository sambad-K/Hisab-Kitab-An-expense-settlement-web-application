import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchGroup } from "@/api/fetch.group.api";

const useFetchGroup = (search: string) => {
  const group = useQuery({
    queryKey: ["groups", search],
    queryFn: () => fetchGroup(search),
    placeholderData: keepPreviousData,
  });
  return group;
};

export default useFetchGroup;
