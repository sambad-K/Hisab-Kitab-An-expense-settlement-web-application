import api from "./axios";
import type { Member } from "@/types/member";

export const fetchGroupMembers = async (id: number): Promise<Member[]> => {
  const members = await api.get(`/groupmembers/${id}`);
  return members.data;
};
