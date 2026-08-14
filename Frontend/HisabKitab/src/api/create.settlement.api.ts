import api from "./axios";
export const createSettlement = (id: number) => {
  return api.post(`/expense/createsettlement/${id}/`);
};
