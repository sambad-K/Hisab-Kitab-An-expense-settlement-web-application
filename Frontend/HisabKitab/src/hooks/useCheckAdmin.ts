import { useQuery } from "@tanstack/react-query";
import checkAdmin from "@/utils/checkAdmin";
const useCheckAdmin = (id: number) => {
  const check = useQuery({
    queryKey: ["check-admin", id],
    queryFn: () => checkAdmin(id),
  });
  return { check };
};

export default useCheckAdmin;
