"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { accessRegistrationKeys } from "../@queryKeys/accessRegistration";

import { getAllAccessRegistrationForFilter } from "@/api/accessRegistration/accessRegistration.api";
import {
  AccessRegistration,
  AccessRegistrationForFilter,
} from "@/types/AccessRegistration";
import { ErrMutation, OptionsTypeUseMutation } from "@/types/ClientQuery";

type Variables = AccessRegistrationForFilter;

export function useGetAllAccessRegistrations(
  options?: OptionsTypeUseMutation<Variables>
) {
  const qc = useQueryClient();

  return useMutation<AccessRegistration[], ErrMutation, Variables>({
    mutationFn: (payload) => getAllAccessRegistrationForFilter(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({
        queryKey: accessRegistrationKeys.all,
        exact: false,
      });
      qc.invalidateQueries({
        queryKey: accessRegistrationKeys.all,
        exact: false,
      });
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
