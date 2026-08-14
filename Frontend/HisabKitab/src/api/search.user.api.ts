import api from "./axios";
import type { User } from "@/types/user";

export const searchUser = async (query: string): Promise<User[]> => {
  const search = await api.get("/user/search/", {
    params: {
      q: query,
    },
  });
  return search.data;
};
