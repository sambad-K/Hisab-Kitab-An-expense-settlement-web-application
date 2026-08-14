import api from "./axios";
import type { Group } from "@/types/group";

export const retrieveGroup = async (id: number): Promise<Group> => {
  const retrievedGroup = await api.get(`/group/${id}`);
  return retrievedGroup.data;
};
