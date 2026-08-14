import type { Group } from "./group";
export type Dashboard = {
  user: string;
  summary: {
    total_groups: number;
    total_expense: number;
    total_paid: number;
    your_owe: number;
    your_receive: number;
    pending_settlements: number;
  };
  pending_settlement_counts: number;
  completed_settlement_counts: number;
  category: {
    food: number;
    entertainment: number;
    travel: number;
    gaming: number;
    others: number;
  };
  group?: Group[];
  activity?: string[];
};
