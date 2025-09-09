"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { updateClient } from "@/api/client/client.api";
import { clientKeys } from "@/hooks/queryKeys/clients.keys";
import { UpdateClient } from "@/types/Client";

type Variables = UpdateClient;
type Data = unknown;
type Err = Error;

export function useUpdateClient(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateClient(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: clientKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}
