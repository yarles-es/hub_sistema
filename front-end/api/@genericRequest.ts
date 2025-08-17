import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import api from "./@api";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface GenericRequestOptions {
  body?: any;
  responseType?: AxiosRequestConfig["responseType"];
  signal?: AbortSignal;
  returnFullResponse?: boolean;
  headers?: Record<string, string>;
  onDownloadProgress?: AxiosRequestConfig["onDownloadProgress"];
}

export const genericRequest = async <T>(
  method: HttpMethod,
  url: string,
  options: GenericRequestOptions = {}
): Promise<T | AxiosResponse<T>> => {
  const {
    body,
    responseType = "json",
    signal,
    returnFullResponse,
    headers,
    onDownloadProgress,
  } = options;

  const token = localStorage.getItem("token");

  try {
    const apiInstance = api();
    const response = await apiInstance.request<T>({
      method,
      url,
      data: body ?? undefined,
      responseType,
      signal,
      headers: {
        ...(token ? { Authorization: `${token}` } : {}),
        ...(headers ?? {}),
      },
      onDownloadProgress,
    });

    return returnFullResponse ? (response as AxiosResponse<T>) : response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          throw new Error(text || "Erro desconhecido (blob)");
        } catch {
          throw new Error("Erro na requisição (blob)");
        }
      }
      throw new Error(error.response?.data?.error || "Erro desconhecido");
    }
    throw new Error("Erro na requisição");
  }
};
