"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { getAllClients } from "@/api/client/client.api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import PageTransition from "@/components/PageTransition/PageTransition";
import Pagination from "@/components/Pagination/Pagination";
import ClientTable from "@/components/Tables/ClientTable";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import useAlert from "@/hooks/useAlert";
import { GetAllClient, StatusClient } from "@/types/Client";
import { ModalClientType } from "@/types/ModalTypes";

const ClientPage = () => {
  const alert = useAlert();

  const [modals, setModals] = useState<ModalClientType>("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const searchParams = useSearchParams();

  const queryParams: GetAllClient = useMemo(
    () => ({
      numberPage: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      nome: searchParams.get("nome") || undefined,
      email: searchParams.get("email") || undefined,
      telefone: searchParams.get("telefone") || undefined,
      dataNascimento: searchParams.get("dataNascimento") || undefined,
      status: searchParams.get("status") as StatusClient | undefined,
    }),
    [searchParams]
  );

  const {
    data: clients,
    refetch,
    error,
  } = useQuery({
    queryKey: ["getAllClients", queryParams],
    queryFn: () => getAllClients(queryParams),
    retry: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (error) alert(error.message, "error");

    return () => setModals("");
  }, [error, alert]);

  const objectVisualModals = {
    create: () => setModals("create"),
    edit: () => setModals("edit"),
    delete: () => setModals("delete"),
    search: () => setModals("search"),
  };

  const onOpenModal = (id: number, type: ModalClientType) => {
    if (!type) return;

    setItemSelected(id);
    objectVisualModals[type]();
  };

  return (
    <PageTransition>
      <div>
        <Breadcrumb pageName="Clientes" />
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
        {clients?.data && clients.data.length > 0 ? (
          <div className="mt-1.5 xl:mt-3">
            <PageTransition>
              <ClientTable
                clients={clients.data}
                onOpenItemSelect={onOpenModal}
              />
            </PageTransition>
            <Pagination
              limit={clients.limit}
              page={clients.page}
              total={clients.total}
            />
          </div>
        ) : null}
      </div>
    </PageTransition>
  );
};

export default ClientPage;
