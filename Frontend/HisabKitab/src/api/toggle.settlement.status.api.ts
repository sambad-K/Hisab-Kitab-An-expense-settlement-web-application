import api from "./axios";
export const toggleSettlementStatus = async (id: number) => {
  return await api.patch(`/expense/togglesettlement/${id}/`);
};
