import api from "./axios";
import type { Group } from "@/types/group";

export const fetchGroup = async (search: string): Promise<Group[]> => {
  const group = await api.get(`/group/?q=${search}`);
  return group.data;
};
