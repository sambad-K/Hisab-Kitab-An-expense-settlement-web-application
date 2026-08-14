import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateExpenseForm from "@/forms/CreateExpenseForm";
import { IoCreateOutline } from "react-icons/io5";
import type { CreateExpenseProps } from "@/props/CreateExpenseProps";
import { useState } from "react";
export default function CreateExpensePopup({ id }: CreateExpenseProps) {
  const [show, setShow] = useState(false);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger
        className="w-40"
        render={
          <Button
            variant="outline"
            className="font-bold bg-green-500 text-white hover:scale-105 hover:bg-green-650 hover:text-white"
          >
            <IoCreateOutline />
            Create Expense
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <CreateExpenseForm id={id} show={show} onOpenChange={setShow} />
      </DialogContent>
    </Dialog>
  );
}
