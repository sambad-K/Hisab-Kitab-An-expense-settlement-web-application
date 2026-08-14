import type { Group } from "./group";
import type { User } from "./user";
export type Activity = {
  id: number;
  group: Group;
  user: User;
  type: string;
  title: string;
  created_at: string;
};
