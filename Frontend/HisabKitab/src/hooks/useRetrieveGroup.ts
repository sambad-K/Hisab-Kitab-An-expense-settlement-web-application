import { useQuery } from "@tanstack/react-query";
import { retrieveGroup } from "@/api/retrieve.group.api";
const useRetrieveGroup = (id: number) => {
  const group = useQuery({
    queryKey: ["retrieve-groups", id],
    queryFn: () => retrieveGroup(id),
  });
  return { group };
};

export default useRetrieveGroup;
