"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientKeys } from "../@queryKeys/clients.keys";

import { createClient } from "@/api/client/client.api";
import { CreateClient } from "@/types/Client";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";

type Variables = CreateClient;

export function useCreateClient(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (data) => createClient(data),

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
