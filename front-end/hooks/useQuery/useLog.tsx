import { useQuery } from "@tanstack/react-query";

import { getLogs } from "@/api/logs/logs.api";
import { GetLog } from "@/types/Log";

export function useLog(queryParams: GetLog) {
  const query = useQuery({
    queryKey: ["logs", queryParams],
    queryFn: () => getLogs(queryParams),
    retry: 0,
    staleTime: 0,
  });

  return query;
}

export default useLog;
