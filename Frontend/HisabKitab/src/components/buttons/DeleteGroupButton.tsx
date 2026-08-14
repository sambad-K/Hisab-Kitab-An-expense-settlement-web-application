import useDeleteGroup from "@/hooks/useDeleteGroup";
import { Button } from "@base-ui/react";
import type { DeleteProps } from "@/types/delete";
const DeleteGroupButton = ({ id, onOpenChange }: DeleteProps) => {
  const { mutate } = useDeleteGroup(id);
  return (
    <Button
      onClick={() => {
        mutate();
        onOpenChange?.(false);
      }}
      className="bg-red-500 p-3 text-white rounded-md hover:bg-red-600 transistion duration-300"
    >
      Delete
    </Button>
  );
};

export default DeleteGroupButton;
