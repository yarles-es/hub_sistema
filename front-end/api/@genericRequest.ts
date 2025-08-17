import axios, { AxiosResponse, Method, AxiosRequestConfig } from "axios";

import api from "./@api";

type GenericRequestOptions = {
  body?: any;
  responseType?: AxiosRequestConfig["responseType"];
  signal?: AbortSignal;
  headers?: Record<string, string>;
  onDownloadProgress?: AxiosRequestConfig["onDownloadProgress"];
  returnFullResponse?: boolean;
};

export async function genericRequest<T>(
  method: Method | "get" | "post" | "put" | "delete" | "patch",
  url: string,
  options?: Omit<GenericRequestOptions, "returnFullResponse"> & {
    returnFullResponse?: false;
  }
): Promise<T>;

export async function genericRequest<T>(
  method: Method | "get" | "post" | "put" | "delete" | "patch",
  url: string,
  options: GenericRequestOptions & { returnFullResponse: true }
): Promise<AxiosResponse<T>>;

export async function genericRequest<T>(
  method: Method | "get" | "post" | "put" | "delete" | "patch",
  url: string,
  options: GenericRequestOptions = {}
): Promise<T | AxiosResponse<T>> {
  const {
    body,
    responseType = "json",
    signal,
    headers,
    onDownloadProgress,
    returnFullResponse,
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
        ...(token ? { Authorization: token } : {}),
        ...(headers ?? {}),
      },
      onDownloadProgress,
    });

    return returnFullResponse
      ? (response as AxiosResponse<T>)
      : (response.data as T);
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
}
