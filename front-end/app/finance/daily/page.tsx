"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { getAllDaily } from "@/api/finance/daily.api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import ModalCreateDaily from "@/components/Modals/DailyModals/ModalCreateDaily";
import ModalDeleteDaily from "@/components/Modals/DailyModals/ModalDeleteDaily";
import ModalEditDaily from "@/components/Modals/DailyModals/ModalEditDaily";
import ModalSearchDaily from "@/components/Modals/DailyModals/ModalSearchDaily";
import PageTransition from "@/components/PageTransition/PageTransition";
import Pagination from "@/components/Pagination/Pagination";
import DailyFinanceTable from "@/components/Tables/DailyFinanceTable";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import useAlert from "@/hooks/useAlert";
import { LIMIT_WITH_PAGE, NUMBER_PAGE } from "@/schemas/paginationSchemas";
import { GetAllDaily, PaymentType } from "@/types/Daily";
import { ModalDailyType } from "@/types/ModalTypes";

const DailyPage = () => {
  const alert = useAlert();

  const [modals, setModals] = useState<ModalDailyType>("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const objectVisualModals = {
    create: () => setModals("create"),
    edit: () => setModals("edit"),
    delete: () => setModals("delete"),
    search: () => setModals("search"),
    pay: () => setModals("pay"),
  };

  const searchParams = useSearchParams();

  const queryParams: GetAllDaily = useMemo(
    () => ({
      numberPage: Number(searchParams.get("page")) || NUMBER_PAGE,
      limit: Number(searchParams.get("limit")) || LIMIT_WITH_PAGE,
      initialDate: searchParams.get("initialDate") || undefined,
      finalDate: searchParams.get("finalDate") || undefined,
      nomeCliente: searchParams.get("nomeCliente") || undefined,
      observacao: searchParams.get("observacao") || undefined,
      formaPagamento: searchParams
        .getAll("formaPagamento")
        .map((value) => value as PaymentType) || [
        PaymentType.DINHEIRO,
        PaymentType.PIX,
        PaymentType.CARTAO,
        PaymentType.GRATIS,
      ],
    }),
    [searchParams]
  );

  const {
    data: dailyData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["daily", queryParams],
    queryFn: () => getAllDaily(queryParams),
    retry: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (error) alert(error.message, "error");

    return () => setModals("");
  }, [error, alert]);

  const onOpenModal = (id: number, type: ModalDailyType) => {
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
        <Breadcrumb pageName="Diárias" />
        <HeaderTable viewHeader={true}>
          <>
            <Button header onClick={() => onOpenModal(0, "search")}>
              <p> Consultar</p>
            </Button>
            <Button header onClick={() => onOpenModal(0, "create")}>
              <p>Cadastrar</p>
            </Button>
          </>
        </HeaderTable>
      </div>
      <div className="flex flex-col gap-4">
        {dailyData?.data && dailyData.data.length > 0 ? (
          <div className="mt-1.5 xl:mt-3">
            <PageTransition>
              <DailyFinanceTable
                dailys={dailyData.data}
                onOpenItemSelect={onOpenModal}
              />
            </PageTransition>
            <Pagination
              limit={dailyData.limit}
              page={dailyData.page}
              total={dailyData.total}
            />
          </div>
        ) : null}

        {modals === "create" && (
          <ModalCreateDaily
            isOpen={modals === "create"}
            onClose={() => setModals("")}
            onCloseAndGetDaily={() => {
              setModals("");
              refetch();
            }}
          />
        )}

        {modals === "search" && (
          <ModalSearchDaily
            isOpen={modals === "search"}
            onClose={() => setModals("")}
          />
        )}

        {modals === "delete" && (
          <ModalDeleteDaily
            isOpen={modals === "delete"}
            onClose={() => {
              setModals("");
              setItemSelected(0);
            }}
            onCloseAndGetDaily={() => {
              setModals("");
              setItemSelected(0);
              refetch();
            }}
            itemSelected={itemSelected}
          />
        )}

        {modals === "edit" && (
          <ModalEditDaily
            isOpen={modals === "edit"}
            onClose={() => {
              setModals("");
              setItemSelected(0);
            }}
            onCloseAndGetDaily={() => {
              setModals("");
              setItemSelected(0);
              refetch();
            }}
            daily={dailyData?.data.find((item) => item.id === itemSelected)}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default DailyPage;
