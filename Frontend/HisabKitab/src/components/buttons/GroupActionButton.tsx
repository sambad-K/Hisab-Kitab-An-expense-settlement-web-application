import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DeleteProps } from "@/types/delete";
import DeleteConfirmPopup from "../popups/DeleteConfirmPopUp";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import { useNavigate } from "@tanstack/react-router";
import { CiSettings } from "react-icons/ci";
export default function GroupActionButton({ id }: DeleteProps) {
  const { check } = useCheckAdmin(id);
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate({ to: "/groupdetail/$id", params: { id: String(id) } });
  };
  return (
    <Popover>
      <PopoverTrigger 
        className="w-20"
        render={
          <Button variant="outline">
            <CiSettings />
          </Button>
        }
      />
      <PopoverContent className="w-auto -z-10">
        <Button onClick={() => goToDetail()}>Detail</Button>
        {check.data && <DeleteConfirmPopup id={id} />}
      </PopoverContent>
    </Popover>
  );
}
