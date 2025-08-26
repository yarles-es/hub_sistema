"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { getAllMonthlyFees } from "@/api/monthlyFee/monthlyFee.api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import ModalCancelMonthlyFee from "@/components/Modals/MonthlyFeeModals/ModalCancelMonthlyFee";
import ModalPayMonthlyFee from "@/components/Modals/MonthlyFeeModals/ModalPayMonthlyFee";
import ModalSearchMonthlyFee from "@/components/Modals/MonthlyFeeModals/ModalSearchMonthlyFee";
import PageTransition from "@/components/PageTransition/PageTransition";
import Pagination from "@/components/Pagination/Pagination";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import MonthlyFeeTable from "@/components/Tables/MonthlyFeeTable";
import useAlert from "@/hooks/useAlert";
import { LIMIT_WITH_PAGE, NUMBER_PAGE } from "@/schemas/paginationSchemas";
import { PaymentType } from "@/types/Daily";
import { ModalMonthlyFeeType } from "@/types/ModalTypes";
import { MonthlyFeeStatus } from "@/types/MonthlyFee";

const MonthlyFeePage = () => {
  const alert = useAlert();

  const [modals, setModals] = useState("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const objectVisualModals = {
    cancel: () => setModals("cancel"),
    search: () => setModals("search"),
    pay: () => setModals("pay"),
  };

  const searchParams = useSearchParams();
  const queryParams = useMemo(
    () => ({
      numberPage: Number(searchParams.get("page")) || NUMBER_PAGE,
      limit: Number(searchParams.get("limit")) || LIMIT_WITH_PAGE,
      initialDate: searchParams.get("initialDate") || undefined,
      finalDate: searchParams.get("finalDate") || undefined,
      clienteId: searchParams.get("clientId")
        ? Number(searchParams.get("clientId"))
        : undefined,
      formaPagamento: searchParams
        .getAll("formaPagamento")
        .map((value) => value as PaymentType) || [
        PaymentType.DINHEIRO,
        PaymentType.PIX,
        PaymentType.CARTAO,
        PaymentType.GRATIS,
      ],

      status: searchParams
        .getAll("status")
        .map((value) => value as MonthlyFeeStatus) || [
        MonthlyFeeStatus.PAGO,
        MonthlyFeeStatus.PENDENTE,
      ],
    }),
    [searchParams]
  );

  const {
    data: monthlyFees,
    error,
    refetch,
  } = useQuery({
    queryKey: ["monthlyFees", queryParams],
    queryFn: () => getAllMonthlyFees(queryParams),
    retry: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (error) alert(error.message, "error");

    return () => setModals("");
  }, [error, alert]);

  const onOpenModal = (id: number, type: ModalMonthlyFeeType) => {
    if (!type) {
      alert("Tipo de modal inválido.", "error");
      return;
    }
    objectVisualModals[type]();
    setItemSelected(id);
  };

  return (
    <PageTransition>
      <div>
        <Breadcrumb pageName="Mensalidades" />
        <HeaderTable viewHeader={true}>
          <>
            <Button header onClick={() => onOpenModal(0, "search")}>
              <p> Consultar</p>
            </Button>
          </>
        </HeaderTable>
      </div>

      <div className="flex flex-col gap-4">
        {monthlyFees?.data && monthlyFees.data.length > 0 ? (
          <div className="mt-1.5 xl:mt-3">
            <PageTransition>
              <MonthlyFeeTable
                MonthlyFees={monthlyFees.data}
                onOpenItemSelect={onOpenModal}
              />
              <Pagination
                limit={monthlyFees.limit}
                page={monthlyFees.page}
                total={monthlyFees.total}
              />
            </PageTransition>
          </div>
        ) : null}

        {modals === "search" && (
          <ModalSearchMonthlyFee
            isOpen={modals === "search"}
            onClose={() => setModals("")}
          />
        )}

        {modals === "cancel" && (
          <ModalCancelMonthlyFee
            isOpen={modals === "cancel"}
            onClose={() => setModals("")}
            onCloseAndGetMonthlyFee={() => {
              setModals("");
              setItemSelected(0);
              refetch();
            }}
            monthlyFeeId={itemSelected}
          />
        )}

        {modals === "pay" && (
          <ModalPayMonthlyFee
            isOpen={modals === "pay"}
            onClose={() => setModals("")}
            onCloseAndGetMonthlyFee={() => {
              setModals("");
              setItemSelected(0);
              refetch();
            }}
            monthlyFeeId={itemSelected}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default MonthlyFeePage;
