import { checkMember } from "@/api/check.member.api";

const checkAdmin = async (id: number) => {
  const members = await checkMember();
  if (members.some((member) => member.group.id === id)) {
    return true;
  } else {
    return false;
  }
};

export default checkAdmin;
