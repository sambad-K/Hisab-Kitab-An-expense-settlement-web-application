import api from "./axios";
import type { UpdateSchemaValue } from "@/schema/update.schema";
export const updateProfile = async (id: number, data: UpdateSchemaValue) => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("email", data.email);
  if (data.picture) {
    formData.append("picture", data.picture);
  }
  await api.patch(`/user/update/${id}/`, formData);
  console.log(FormData);
};
