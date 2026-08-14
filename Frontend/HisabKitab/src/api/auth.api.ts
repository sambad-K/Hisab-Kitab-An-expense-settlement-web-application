import api from "./axios";
export interface RegisterData {
  username: string;
  first_name: string;
  last_name: string;
  picture: File;
  email: string;
  password1: string;
  password2: string;
}
export const register = (data: RegisterData) => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("email", data.email);
  formData.append("password1", data.password1);
  formData.append("password2", data.password2);
  formData.append("picture", data.picture);
  return api.post("/account/register/", formData);
};
export const login = (data: { email: string; password: string }) => {
  return api.post("/account/login/", data);
};
