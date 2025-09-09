import { useQuery } from "@tanstack/react-query";

import { findAllUsers } from "@/api/users/user.api";

export function useUser() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: findAllUsers,
    retry: 0,
  });

  return query;
}

export default useUser;
