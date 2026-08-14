import { addMember } from "@/api/add.group.member.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const useAddGroupMember = (pk: number, id: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => addMember(pk, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group-members"],
      });
      queryClient.invalidateQueries({
        queryKey: ["expense-per-member", pk],
      });

      toast.success("Added the user to the group");
    },
    onError: () => {
      toast.error("Failed to add user!, try again or make sure the user is not in the group");
    },
  });
  return { mutate };
};

export default useAddGroupMember;
