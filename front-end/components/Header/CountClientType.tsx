import { useQuery } from "@tanstack/react-query";

import { getCountClients } from "@/api/client/client.api";

const CountClientType = () => {
  const { data, refetch } = useQuery({
    queryKey: ["countClientType"],
    queryFn: async () => getCountClients(),
    retry: 0,
    staleTime: 0,
  });

  return (
    <div className="flex items-center gap-2 2xsm:gap-4">
      <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-success text-success">
        Ativos: {data?.ativos || 0}
      </span>
      <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-warning text-warning">
        Mensalidades Ausentes: {data?.mensalidadesAusentes || 0}
      </span>
      <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-danger text-danger">
        Vencidos: {data?.vencidos || 0}
      </span>
      <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-danger text-danger">
        Desativados: {data?.desativados || 0}
      </span>
      <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-meta-5 text-meta-5">
        Isentos: {data?.isentos || 0}
      </span>
    </div>
  );
};

export default CountClientType;
