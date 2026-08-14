import api from "./axios";
import type { Dashboard } from "@/types/dashboard";

export const fetchDashboard = async (): Promise<Dashboard> => {
  const dashboard = await api.get(`/dashboard/`);
  return dashboard.data;
};
