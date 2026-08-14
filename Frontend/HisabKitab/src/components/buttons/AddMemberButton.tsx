import useAddGroupMember from "@/hooks/useAddGroupMember";
import { Button } from "../ui/button";
import type { AddMemberProps } from "@/props/AddMemberProps";
const AddMemberButton = ({ pk, id }: AddMemberProps) => {
  const { mutate } = useAddGroupMember(pk, id);

  return <Button onClick={() => mutate()}>Add</Button>;
};

export default AddMemberButton;
