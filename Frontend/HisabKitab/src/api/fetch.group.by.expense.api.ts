import api from "./axios";
import type { Group } from "@/types/group";

export const fetchGroupByExpense = async (id: number): Promise<Group> => {
  const group = await api.get(`/expense/getgroup/${id}`);
  return group.data;
};
