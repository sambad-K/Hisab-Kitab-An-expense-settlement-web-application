import api from "./axios";
export const deleteExpense = async (id: number) => {
  await api.delete(`/expense/delete/${id}/`);
};
