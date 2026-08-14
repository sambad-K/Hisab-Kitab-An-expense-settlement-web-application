import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/api/fetch.user.api";

const useFetchUser = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUser,
  });
  return { data, isLoading, error, isSuccess };
};

export default useFetchUser;
