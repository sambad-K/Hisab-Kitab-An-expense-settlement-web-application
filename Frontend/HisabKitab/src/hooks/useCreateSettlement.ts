import { createSettlement } from "@/api/create.settlement.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
const useCreateSettlement = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => createSettlement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settlements", id],
      });

      toast.success("Settlement created");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to create settlement");
      }
    },
  });
  return { mutate };
};

export default useCreateSettlement;
