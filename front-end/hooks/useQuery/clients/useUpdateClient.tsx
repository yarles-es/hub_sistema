"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateClient } from "@/api/client/client.api";
import { clientKeys } from "@/hooks/useQuery/@queryKeys/clients.keys";
import { UpdateClient } from "@/types/Client";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";

type Variables = UpdateClient;

export function useUpdateClient(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (data) => updateClient(data),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: clientKeys.all, exact: false });
      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
