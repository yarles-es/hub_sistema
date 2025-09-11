"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productKeys } from "../@queryKeys/product.keys";

import { updateProduct } from "@/api/product/product.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { UpdateProduct } from "@/types/product";

type Variables = UpdateProduct;

export function useUpdateProduct(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => updateProduct(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: productKeys.all, exact: false });
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
