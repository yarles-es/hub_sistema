"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "../@queryKeys/user.keys";

import { EditUserStatus, updateUserStatus } from "@/api/users/user.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";

type Variables = EditUserStatus;

export function useUpdateStatusUser(
  options?: OptionsTypeUseMutation<Variables>
) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => updateUserStatus(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: userKeys.all, exact: false });
      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },

    retry: 0,
  });
}
