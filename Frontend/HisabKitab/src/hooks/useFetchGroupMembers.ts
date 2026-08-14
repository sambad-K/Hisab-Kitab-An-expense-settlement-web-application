import { useQuery } from "@tanstack/react-query";
import { fetchGroupMembers } from "@/api/fetch.group.members.api";

const useFetchGroupMembers = (id: number) => {
  const members = useQuery({
    queryKey: ["group-members", id],
    queryFn: () => fetchGroupMembers(id),
  });
  return { members };
};

export default useFetchGroupMembers;
