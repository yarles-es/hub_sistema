import axios, { AxiosResponse } from "axios";

import { useAuthStore } from "@/store/auth";

const urlLink = "http://localhost:3000/api";

export const api = () => {
  const apiInstance = axios.create({
    baseURL: urlLink,
  });
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const newToken = response.headers.authorization;

      if (newToken) {
        localStorage.setItem("token", `Bearer ${newToken}`);
        window.dispatchEvent(new Event("tokenUpdated"));
      }

      return response;
    },
    (error) => {
      if (error.response) {
        if (
          error.response.status === 401 &&
          (error.response.data?.error === "Token inválido ou expirado" ||
            error.response.data?.error === "Token não fornecido")
        ) {
          useAuthStore.getState().setInvalid(true);
        }
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
};

export default api;
