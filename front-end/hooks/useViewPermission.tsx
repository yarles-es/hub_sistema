import { useEffect, useState } from "react";

import { useUserData } from "./useUserData";

const useViewPermission = () => {
  const user = useUserData();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const checkPermissions = () =>
      setHasPermission(user?.administrador ? true : false);
    checkPermissions();

    window.addEventListener("tokenUpdated", checkPermissions);
    return () => window.removeEventListener("tokenUpdated", checkPermissions);
  }, [user]);

  return hasPermission;
};

export default useViewPermission;
