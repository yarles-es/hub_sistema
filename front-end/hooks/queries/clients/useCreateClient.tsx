"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { createClient } from "@/api/client/client.api";
import { clientKeys } from "@/hooks/queryKeys/clients.keys";
import { CreateClient } from "@/types/Client";

type Variables = CreateClient;
type Data = unknown;
type Err = Error;

export function useCreateClient(
  options?: Omit<UseMutationOptions<Data, Err, Variables>, "mutationFn">
) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => createClient(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: clientKeys.all, exact: false });
    },
    onError: (e, v, c) => {
      options?.onError?.(e, v, c);
    },
    ...options,
  });
}
