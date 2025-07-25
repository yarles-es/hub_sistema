import axios from "axios";

import api from "./@api";

export interface SuccessResponse<T> {
  data: T;
}

export const genericRequest = async <T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  body?: any
): Promise<T> => {
  const token = localStorage.getItem("token");
  try {
    const apiInstance = api();
    const response = await apiInstance({
      method,
      url,
      data: body ? body : {},
      headers: token ? { Authorization: `${token}` } : {},
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro desconhecido");
    }

    // Lança qualquer outro tipo de erro não relacionado ao Axios
    throw new Error("Erro na requisição");
  }
};
