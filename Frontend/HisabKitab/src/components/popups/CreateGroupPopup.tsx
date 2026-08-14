import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateGroupForm from "@/forms/CreateGroupForm";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
export default function CreateGroupPopup() {
  const [show, setShow] = useState(false);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="font-bold bg-green-500 text-white hover:scale-105 hover:bg-green-650 hover:text-white"
          >
            <IoCreateOutline />
            Create Group
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <CreateGroupForm onOpenChange={setShow} />
      </DialogContent>
    </Dialog>
  );
}
