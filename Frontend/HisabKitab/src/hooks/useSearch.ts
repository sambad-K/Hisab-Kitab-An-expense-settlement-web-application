import { useQuery } from "@tanstack/react-query";
import { searchUser } from "@/api/search.user.api";

const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search-users", query],
    queryFn: () => searchUser(query),
    enabled: query.trim().length > 0, //i did this because it prevents api call if input is empty
  });
};

export default useSearch;
