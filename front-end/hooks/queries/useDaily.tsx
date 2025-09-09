"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllDaily } from "@/api/finance/daily.api";
import { GetAllDaily } from "@/types/Daily";

export function useDaily(queryParams: GetAllDaily) {
  const query = useQuery({
    queryKey: ["daily", queryParams],
    queryFn: () => getAllDaily(queryParams),
    retry: 0,
    staleTime: 0,
  });

  return query;
}
