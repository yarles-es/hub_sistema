"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { disableClient } from "@/api/client/client.api";
import { clientKeys } from "@/hooks/queryKeys/clients.keys";

type Variables = number;
type Data = unknown;
type Err = Error;

export function useDisableClient(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => disableClient(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: clientKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}
