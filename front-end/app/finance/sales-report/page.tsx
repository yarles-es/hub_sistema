"use client";

import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import PageTransition from "@/components/PageTransition/PageTransition";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import { useGetAllProductSales } from "@/hooks/queries/productSales/useGetAllProductSales";
import useAlert from "@/hooks/useAlert";
import { LIMIT_WITH_PAGE, NUMBER_PAGE } from "@/schemas/paginationSchemas";
import { ModalSalesReportType } from "@/types/ModalTypes";
import { GetProductSales } from "@/types/ProductSales";

const SalesReportPage = () => {
  const alert = useAlert();

  const searchParams = useSearchParams();

  const [modals, setModals] = useState<ModalSalesReportType>("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const initialDate =
    searchParams.get("initialDate") ?? new Date().toISOString().split("T")[0];

  const queryParams: GetProductSales = useMemo(
    () => ({
      numberPage: Number(searchParams.get("page")) || NUMBER_PAGE,
      limit: Number(searchParams.get("limit")) || LIMIT_WITH_PAGE,
      initialDate,
      finalDate: searchParams.get("finalDate") ?? undefined,
      productId: Number(searchParams.get("productId")),
    }),
    [initialDate, searchParams]
  );

  const {
    data: productSales,
    error,
    refetch,
  } = useGetAllProductSales(queryParams);

  useEffect(() => {
    if (error) alert(error.message, "error");

    return () => setModals("");
  }, [error, alert]);

  const objectVisualModals = {
    delete: () => setModals("delete"),
    search: () => setModals("search"),
  };

  const onOpenModal = (id: number, type: ModalSalesReportType) => {
    if (!type) return;

    setItemSelected(id);
    objectVisualModals[type]();
  };

  const onCloseModal = (refetchCallback?: boolean) => {
    setModals("");
    setItemSelected(0);
    if (refetchCallback) refetch();
  };

  return (
    <PageTransition>
      <div>
        <Breadcrumb pageName="Relatório de Vendas" />
        <HeaderTable viewHeader={true}>
          <>
            <Button header onClick={() => onOpenModal(0, "search")}>
              <p>Consultar</p>
            </Button>
          </>
        </HeaderTable>
      </div>

      <div className="flex flex-col gap-4"></div>
    </PageTransition>
  );
};

export default SalesReportPage;
