import { useQuery } from "@tanstack/react-query";

import { getAllPlanos } from "@/api/plano/plano.api";

export function usePlan() {
  const query = useQuery({
    queryKey: ["getAllPlans"],
    queryFn: () => getAllPlanos(),
    retry: 0,
    staleTime: 0,
  });

  return query;
}

export default usePlan;
