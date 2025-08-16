"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import PageTransition from "@/components/PageTransition/PageTransition";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import useAlert from "@/hooks/useAlert";
import { LIMIT_WITH_PAGE, NUMBER_PAGE } from "@/schemas/paginationSchemas";
import { ModalLogType } from "@/types/ModalTypes";

const LogsPage = () => {
  const alert = useAlert();

  const [modals, setModals] = useState<ModalLogType>("");

  const searchParams = useSearchParams();

  const objectVisualModals = {
    search: () => setModals("search"),
  };

  const queryParams = useMemo(
    () => ({
      userId: searchParams.get("userId") || undefined,
      clienteId: searchParams.get("clientId") || undefined,
      numberPage: Number(searchParams.get("page")) || NUMBER_PAGE,
      limit: Number(searchParams.get("limit")) || LIMIT_WITH_PAGE,
      initialDate: searchParams.get("initialDate") || undefined,
      finalDate: searchParams.get("finalDate") || undefined,
    }),
    [searchParams]
  );

  const {
    data: logs,
    refetch,
    error,
  } = useQuery({
    queryKey: ["logs", queryParams],
    queryFn: () => getLogs(queryParams),
    retry: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (error) alert(error.message, "error");

    return () => setModals("");
  }, [error, alert]);

  const onOpenModal = (id: number, type: ModalLogType) => {
    if (!type) {
      alert("Tipo de modal inválido.", "error");
      return;
    }
    objectVisualModals[type]();
  };

  return (
    <PageTransition>
      <div>
        <Breadcrumb pageName="Logs" />
        <HeaderTable viewHeader={true}>
          <>
            <Button header onClick={() => onOpenModal(0, "search")}>
              <p> Consultar</p>
            </Button>
          </>
        </HeaderTable>
      </div>

      <div className="flex flex-col gap-4">
        {logs ? (
          <div className="mt-1.5 xl:mt-3">
            <PageTransition>
              <table></table>
            </PageTransition>
            <p>pagination</p>
          </div>
        ) : null}

        {modals === "search" && <p>modal de busca</p>}
      </div>
    </PageTransition>
  );
};
