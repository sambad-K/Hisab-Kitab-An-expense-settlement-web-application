import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const url = error.config?.url ?? "";
    if (error.response?.status === 401 && url.includes("/isloggedin/")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
export default api;
