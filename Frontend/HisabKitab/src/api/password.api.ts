import api from "./axios";
import type { ResetRequestSchemaValue } from "@/schema/reset.request.schema";
import type { ResetSchemaValue } from "@/schema/reset.schema";
export const requestPasswordReset = async (data: ResetRequestSchemaValue) => {
  api.post("/resetpasswordrequest/", data);
};

export const resetPassword = async (data: {
  uid64: string;
  token: string;
  data: ResetSchemaValue;
}) => {
  const response = await api.post(`/resetpassword/${data.uid64}/${data.token}/`, data.data);
  return response.data;
};
