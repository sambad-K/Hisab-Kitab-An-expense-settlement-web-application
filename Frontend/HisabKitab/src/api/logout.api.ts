import api from "./axios";
export const logout = () => {
  return api.post("/logout/");
};
