import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpdateExpenseForm from "@/forms/UpdateExpenseForm";
import type { UpdateExpenseProps } from "@/props/UpdateExpenseProps";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
export default function UpdateExpensePopup({
  id,
  category,
  split_type,
  amount,
}: UpdateExpenseProps) {
  const [show, setShow] = useState(false);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger
        className="w-10"
        render={
          <Button
            variant="outline"
            className="font-bold bg-green-500 text-white hover:scale-105 hover:bg-green-650 hover:text-white "
          >
            <IoCreateOutline />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm ">
        <UpdateExpenseForm
          id={id}
          category={category}
          split_type={split_type}
          amount={amount}
          onOpenChange={setShow}
          open={show}
        />
      </DialogContent>
    </Dialog>
  );
}
