import type { Dashboard } from "../types/dashboard";
export type DashSliderProps = {
  summary: Dashboard["summary"];
  pending_settlement_counts: number;
  completed_settlement_counts: number;
};
