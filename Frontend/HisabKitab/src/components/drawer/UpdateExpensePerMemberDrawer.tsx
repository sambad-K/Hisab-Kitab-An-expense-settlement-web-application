import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import type { UpdateExpensePerMemberProps } from "@/props/UpdateExpensePerMemberProps";
import UpdateExpensePerMemberForm from "@/forms/UpdateExpensePerMemberForm";
import { useState } from "react";
export function UpdateExpensePerMemberDrawer({
  id,
  paid_amount,
  percent,
  share_amount,
  gid,
  expense,
}: UpdateExpensePerMemberProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Drawer open={show} onOpenChange={setShow}>
        <DrawerTrigger
          className="bg-green-500 hover:bg-green-600 transistion duration-300 text-white"
          render={<Button variant="secondary">Make Changes</Button>}
        />
        <DrawerContent>
          <div className="flex-1 p-4">
            <UpdateExpensePerMemberForm
              id={id}
              paid_amount={paid_amount}
              percent={percent}
              share_amount={share_amount}
              gid={gid}
              open={show}
              onOpenChange={setShow}
              expense={expense}
            />
          </div>
          <DrawerFooter className="flex flex-row justify-center">
            <DrawerClose className="w-40 " render={<Button>Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
