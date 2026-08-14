import api from "./axios";
import type { Member } from "@/types/member";

export const checkMember = async (): Promise<Member[]> => {
  const check = await api.get("/checkmember/");
  return check.data;
};
