import api from "./axios";
import type { User } from "@/types/user";

export const fetchUser = async (): Promise<User> => {
  const profile = await api.get(`/user/profile/`);
  return profile.data[0];
};
