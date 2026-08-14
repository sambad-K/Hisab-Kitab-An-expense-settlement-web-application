import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { toggleSettlementStatus } from "@/api/toggle.settlement.status.api";
const useToggleSettlementStatus = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => toggleSettlementStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settlement"],
      });
      toast.success("Updated settlement status");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error("Failed to update settlement status");
      }
    },
  });
  return { mutate };
};

export default useToggleSettlementStatus;
