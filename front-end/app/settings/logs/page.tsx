"use client";

import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import ModalSearchLog from "@/components/Modals/LogModals/ModalSearchLog";
import PageTransition from "@/components/PageTransition/PageTransition";
import Pagination from "@/components/Pagination/Pagination";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import LogsTable from "@/components/Tables/LogsTable";
import useLog from "@/hooks/queries/useLog";
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

  const initialDate =
    searchParams.get("initialDate") ?? new Date().toISOString().split("T")[0];

  const queryParams = useMemo(
    () => ({
      numberPage: Number(searchParams.get("page")) || NUMBER_PAGE,
      limit: Number(searchParams.get("limit")) || LIMIT_WITH_PAGE,
      usuarioId: Number(searchParams.get("usuarioId")) || undefined,
      clienteId: Number(searchParams.get("clienteId")) || undefined,
      initialDate,
      finalDate: searchParams.get("finalDate") || undefined,
    }),
    [searchParams, initialDate]
  );

  const { data: logs, error } = useLog(queryParams);

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
              <LogsTable logs={logs.data} onOpenItemSelect={onOpenModal} />
            </PageTransition>
            <Pagination
              limit={logs.limit}
              page={logs.page}
              total={logs.total}
            />
          </div>
        ) : null}

        {modals === "search" && (
          <ModalSearchLog
            isOpen={modals === "search"}
            onClose={() => setModals("")}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default LogsPage;
