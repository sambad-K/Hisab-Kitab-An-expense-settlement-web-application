import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "@/api/fetch.dashboard.api";
const useFetchDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
};

export default useFetchDashboard;
