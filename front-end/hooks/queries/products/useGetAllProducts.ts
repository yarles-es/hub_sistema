"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { productKeys } from "../@queryKeys/product.keys";

import { getAllProducts } from "@/api/product/product.api";
import { Product } from "@/types/product";

export function useGetAllProducts(
  options?: Omit<
    UseQueryOptions<
      Product[],
      Error,
      Product[],
      ReturnType<typeof productKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<
    Product[],
    Error,
    Product[],
    ReturnType<typeof productKeys.list>
  >({
    queryKey: productKeys.list(),
    queryFn: () => getAllProducts(),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}
