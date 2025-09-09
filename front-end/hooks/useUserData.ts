import { useMemo, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { DecodedToken } from "@/types/token";

export function useUserData() {
  const [token, _setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const userData = useMemo(() => {
    if (!token) return null;
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return decodedToken.data;
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  }, [token]);

  return userData;
}
