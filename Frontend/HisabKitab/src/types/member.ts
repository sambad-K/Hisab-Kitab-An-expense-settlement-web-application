import type { Group } from "./group";
import type { UserAsMember } from "./userasmember";
export type Member = {
  id: number;
  user: UserAsMember;
  group: Group;
  role: string;
  joined_date: string;
  email: string;
};
