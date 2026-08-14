import { Button } from "@/components/ui/button";
import { Drawer, DrawerHeader, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SettlementList from "../list/SettlementList";
import type { SettlementPopupProps } from "@/props/SettlementPopupsProps";
export default function SettlelmentPopup({ id }: SettlementPopupProps) {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger
        className="bg-green-500 hover:bg-green-600 transistion duration-300 text-white hover:text-white"
        render={<Button variant="outline" />}
      >
        Settlements
      </DrawerTrigger>
      <DrawerContent className="md:w-150 sm:w-50">
        <DrawerHeader className="font-bold text-2xl">Settlements</DrawerHeader>
        <div className=" p-5">
          <SettlementList id={id} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
