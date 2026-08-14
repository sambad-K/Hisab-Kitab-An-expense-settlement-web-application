import type { Member } from "./member";
export type Settlement = {
  id: number;
  from_member: Member;
  to_member: Member;
  amount: number;
  status: boolean;
  first_payment: string;
  latest_payment: string;
};
