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
import DeleteGroupButton from "../buttons/DeleteGroupButton";
import type { DeleteProps } from "@/types/delete";
import { useState } from "react";
export default function DeleteConfirmPopup({ id }: DeleteProps) {
  const [show, setShow] = useState(false);
  return (
    <Dialog onOpenChange={setShow} open={show}>
      <form>
        <DialogTrigger
          className="hover:bg-red-600 bg-red-500 hover:text-white border-gray-300"
          render={<Button className="border-gray-300">Delete</Button>}
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Group?</DialogTitle>
            <DialogDescription>
              Are you sure to delete the group? Make sure no settlements are pending.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DeleteGroupButton id={id} show={show} onOpenChange={setShow} />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
