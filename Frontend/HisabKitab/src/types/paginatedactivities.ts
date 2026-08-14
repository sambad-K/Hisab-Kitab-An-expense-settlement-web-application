import type { Activity } from "./activity";
export type PaginatedActivity = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Activity[];
};
