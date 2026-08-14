import api from "./axios";
import type { Settlement } from "@/types/settlement";

export const fetchSettlement = async (id: number): Promise<Settlement[]> => {
  const settlement = await api.get(`/expense/get-settlement/${id}/`);
  console.log("@@@@--", settlement.data);
  return settlement.data;
};
