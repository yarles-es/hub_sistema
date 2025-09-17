"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { ProductSalesKeys } from "../@queryKeys/ProductSales.keys";

import { getAllProductSales } from "@/api/productSales/productSales.api";
import {
  GetProductSales,
  GetProductSalesResponseWithPagination,
} from "@/types/ProductSales";

export function useGetAllProductSales(
  queryParams: GetProductSales,
  options?: Omit<
    UseQueryOptions<
      GetProductSalesResponseWithPagination,
      Error,
      GetProductSalesResponseWithPagination,
      ReturnType<typeof ProductSalesKeys.list>
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ProductSalesKeys.list(queryParams),
    queryFn: () => getAllProductSales(queryParams),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}
