import { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAllAccessRegistrationsForDay } from "@/api/accessRegistration/accessRegistration.api";
import { AccessRegistration } from "@/types/AccessRegistration";

export function useAccessRegistrationsForDay() {
  const [lastId, setLastId] = useState<number | null>(null);
  const [items, setItems] = useState<AccessRegistration[]>([]);
  const seenIds = useRef<Set<number>>(new Set());

  const { data, isLoading, error } = useQuery({
    queryKey: ["accessRegistrationsForDay", lastId],
    queryFn: () => getAllAccessRegistrationsForDay(lastId),
    refetchInterval: 3000,
    retry: 0,
  });

  useEffect(() => {
    if (!data || data.length === 0) return;

    const incoming = (data as AccessRegistration[]).filter(
      (r) => !seenIds.current.has(r.id)
    );
    if (incoming.length === 0) {
      if (lastId == null && data[0]) setLastId(data[0].id);
      return;
    }

    for (const r of incoming) seenIds.current.add(r.id);

    setItems((prev) => [...incoming, ...prev]);
    setLastId(data[0].id);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return { items, isLoading, error };
}
