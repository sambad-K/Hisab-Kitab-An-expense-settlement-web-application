import api from "./axios";
import axios from "axios";
export const guard = async () => {
  try {
    const response = await api.get("/isloggedin/");
    return response.status === 200;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return false;
      }
    }
    throw error;
  }
};
