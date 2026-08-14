import api from "./axios";
import type { Member } from "@/types/member";

export const addMember = async (pk: number, id: number): Promise<Member> => {
  const addMember = await api.post(`/add/${pk}/${id}`);
  return addMember.data;
};
