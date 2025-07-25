import { jwtDecode } from "jwt-decode";

import { DecodedToken } from "@/types/token";

export const decodeToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken;
  } catch (error) {
    console.error("Erro ao decodificar o token", error);
  }
};
