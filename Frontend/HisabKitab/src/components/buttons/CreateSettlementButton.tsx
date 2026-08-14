import useCreateSettlement from "@/hooks/useCreateSettlement";
import type { CreateSettlementProps } from "@/props/CreateSettlementProps";
import { Button } from "@base-ui/react";
const CreateSettlementButton = ({ id }: CreateSettlementProps) => {
  const { mutate } = useCreateSettlement(id);
  return (
    <Button
      onClick={() => mutate()}
      className="bg-green-500 text-white hover:bg-green-600 rounded-md p-3.5 h-2 flex flex-row items-center "
    >
      Settle
    </Button>
  );
};

export default CreateSettlementButton;
