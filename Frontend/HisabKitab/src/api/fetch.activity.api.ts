import api from "./axios";
import type { PaginatedActivity } from "@/types/paginatedactivities";

export const fetchActivity = async (
  page: number,
  q: string,
  type: string
): Promise<PaginatedActivity> => {
  const group = await api.get(`/activities/?page=${page}&type=${type}&q=${q}`, {});
  return group.data;
};
