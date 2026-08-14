import api from "./axios";
export const deleteGroup = async (id: number) => {
  await api.delete(`/group/${id}/`);
};
