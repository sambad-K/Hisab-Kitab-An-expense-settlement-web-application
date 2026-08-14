import api from "./axios";
export const deleteGroupMember = async (id: number) => {
  await api.delete(`/deletemember/${id}/`);
};
