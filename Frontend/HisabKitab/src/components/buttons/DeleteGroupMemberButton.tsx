import useDeleteGroupMember from "@/hooks/useDeleteGroupMember";
import { Button } from "@base-ui/react";
import type { DeleteProps } from "@/props/DeleteMemberProps";
import { useNavigate } from "@tanstack/react-router";
const DeleteGroupMemberButton = ({ id, button }: DeleteProps) => {
  const { mutate } = useDeleteGroupMember(id);
  const navigate = useNavigate();
  const goToGroup = () => {
    navigate({ to: "/groups", search: { search: "" } });
  };
  return (
    <>
      {button === "Leave" ? (
        <Button
          onClick={() => {
            mutate(undefined, {
              onSuccess: () => {
                goToGroup();
              },
            });
          }}
          className="bg-red-500 p-3 text-white rounded-md hover:bg-red-600 transistion duration-300 w-20"
        >
          {button}
        </Button>
      ) : (
        <Button
          onClick={() => mutate()}
          className="bg-red-500 p-3 text-white rounded-md hover:bg-red-600 transistion duration-300 w-20"
        >
          {button}
        </Button>
      )}
    </>
  );
};

export default DeleteGroupMemberButton;
