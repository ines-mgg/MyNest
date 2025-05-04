import axios, { AxiosHeaders } from "axios";

let onLogout: (() => void) | null = null;

export const registerLogoutHandler = (cb: () => void) => {
  onLogout = cb;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
});

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("kittyToken");

  return {
    ...config,
    headers: new AxiosHeaders({
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }),
  };
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onLogout) {
      onLogout();
    }
    return Promise.reject(error);
  }
);

export default api;
