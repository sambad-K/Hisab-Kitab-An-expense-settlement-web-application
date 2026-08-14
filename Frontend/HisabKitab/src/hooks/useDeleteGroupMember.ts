import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteGroupMember } from "@/api/delete.group.member.api";
import { toast } from "sonner";
import axios from "axios";
const useDeleteGroupMember = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteGroupMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group-members"],
      });
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      queryClient.invalidateQueries({
        queryKey: ["expense-per-member"],
      });

      toast.success("Left from group successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to leave group ");
      }
    },
  });
  return { mutate };
};

export default useDeleteGroupMember;
