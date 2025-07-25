import { useCallback, useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { loginApp } from "@/api/login/login.api";
import { useAuthStore } from "@/store/auth";

import useAlert from "./useAlert";

// Função que valida se o token expirou
function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split(".");
    const payloadJson = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
    );
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    return true;
  }
}

export function useCheckAuth() {
  const router = useRouter();
  const { invalid, setInvalid } = useAuthStore();
  const queryClient = useQueryClient();
  const alert = useAlert();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { mutate } = useMutation({
    mutationFn: loginApp,
    onSuccess: () => {
      setIsAuthenticated(true);
      router.push("/");
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const logout = useCallback(() => {
    queryClient.clear();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  }, [queryClient, router]);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token || invalid || isTokenExpired(token)) {
      localStorage.removeItem("token");
      queryClient.clear();
      setInvalid(false);
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [invalid, queryClient, router, setInvalid]);

  useEffect(() => {
    // Checa imediatamente ao montar
    checkAuth();

    // Depois agenda uma checagem a cada 1 minuto
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        logout();
      }
    }, 60 * 2000); // 60 segundos

    // Limpa o intervalo quando desmontar o hook
    return () => clearInterval(interval);
  }, [checkAuth, logout]);

  const login = useCallback(
    (username: string, senha: string) => {
      mutate({ login: username, senha });
    },
    [mutate]
  );

  return { isAuthenticated, logout, login };
}
