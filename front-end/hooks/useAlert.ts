import { useCallback } from "react";

import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "dark:bg-boxdark-2 dark:text-bodydark",
};

const useAlert = () => {
  const alert = useCallback(
    (message: string, status: "success" | "error" | "info" | "warning") => {
      if (["Invalid token", "Token not found"].includes(message)) return null;

      return new Promise<void>((resolve) => {
        const toastId = status === "error" ? "unique_alert" : undefined;

        if (!toastId) {
          toast[status](message, options);
          return;
        }
        if (!toast.isActive(toastId)) {
          toast[status](message, {
            ...options,
            onClose: () => resolve(),
            toastId: toastId,
          });
          return;
        }
      });
    },
    []
  );

  return alert;
};

export default useAlert;
