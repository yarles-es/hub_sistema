"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { userKeys } from "../@queryKeys/user.keys";

import { findAllUsers } from "@/api/users/user.api";
import { User } from "@/types/User";

export function useGetAllUsers(
  options?: Omit<
    UseQueryOptions<User[], Error, User[], ReturnType<typeof userKeys.list>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<User[], Error, User[], ReturnType<typeof userKeys.list>>({
    queryKey: userKeys.list(),
    queryFn: () => findAllUsers(),
    retry: 0,
    staleTime: 0,
    ...options,
  });
}
