import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteGroup } from "@/api/delete.group.api";
import { toast } from "sonner";
import axios from "axios";
const useDeleteGroup = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      toast.success("Deleted the group");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to delete the group");
      }
    },
  });
  return { mutate };
};

export default useDeleteGroup;
