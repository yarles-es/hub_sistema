"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productKeys } from "../@queryKeys/product.keys";

import { createProduct } from "@/api/product/product.api";
import {
  DataMutation,
  ErrMutation,
  OptionsTypeUseMutation,
} from "@/types/ClientQuery";
import { CreateProduct } from "@/types/product";

type Variables = CreateProduct;

export function useCreateProduct(options?: OptionsTypeUseMutation<Variables>) {
  const qc = useQueryClient();

  return useMutation<DataMutation, ErrMutation, Variables>({
    mutationFn: (payload) => createProduct(payload),

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
