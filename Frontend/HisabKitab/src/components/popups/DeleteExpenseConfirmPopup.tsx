import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DeleteProps } from "@/types/delete";
import useDeleteExpense from "@/hooks/useDeleteExpense";
export default function DeleteExpenseConfirmPopup({ id }: DeleteProps) {
  const { mutate } = useDeleteExpense(id);
  return (
    <Dialog>
      <form>
        <DialogTrigger
          className="hover:bg-red-600 hover:text-white bg-red-500 text-white"
          render={<Button>Delete</Button>}
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Group?</DialogTitle>
            <DialogDescription>Are you sure to delete the expense?</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
              onClick={() => mutate()}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
