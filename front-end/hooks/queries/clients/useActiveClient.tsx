"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { activeClient } from "@/api/client/client.api";
import { clientKeys } from "@/hooks/queryKeys/clients.keys";

type Variables = number;
type Data = unknown;
type Err = Error;

export function useActiveClient(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => activeClient(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: clientKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}
