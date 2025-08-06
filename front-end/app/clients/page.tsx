"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { getAllClients } from "@/api/client/client.api";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import ModalActiveClient from "@/components/Modals/ClientModals/ModalActiveClient";
import ModalCreateClient from "@/components/Modals/ClientModals/ModalCreateClient";
import ModalDisableClient from "@/components/Modals/ClientModals/ModalDisableClient";
import ModalEditClient from "@/components/Modals/ClientModals/ModalEditClient";
import ModalSearchClient from "@/components/Modals/ClientModals/ModalSearchClient";
import PageTransition from "@/components/PageTransition/PageTransition";
import Pagination from "@/components/Pagination/Pagination";
import ClientTable from "@/components/Tables/ClientTable";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import useAlert from "@/hooks/useAlert";
import { LIMIT_WITH_PAGE, NUMBER_PAGE } from "@/schemas/paginationSchemas";
import { GetAllClient, StatusClient } from "@/types/Client";
import { ModalClientType } from "@/types/ModalTypes";

const ClientPage = () => {
  const alert = useAlert();

  const [modals, setModals] = useState<ModalClientType>("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const searchParams = useSearchParams();

  const queryParams: GetAllClient = useMemo(
    () => ({
      numberPage: Number(searchParams.get("page")) || NUMBER_PAGE,
      limit: Number(searchParams.get("limit")) || LIMIT_WITH_PAGE,
      nome: searchParams.get("nome") || undefined,
      email: searchParams.get("email") || undefined,
      telefone: searchParams.get("telefone") || undefined,
      dataNascimento: searchParams.get("dataNascimento") || undefined,
      status: searchParams.get("status") as StatusClient | undefined,
      planoId: searchParams.get("planoId")
        ? Number(searchParams.get("planoId"))
        : undefined,
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
    active: () => setModals("active"),
    search: () => setModals("search"),
    disable: () => setModals("disable"),
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

        {modals === "create" && (
          <ModalCreateClient
            isOpen={modals === "create"}
            onClose={() => setModals("")}
            onCloseAndGetClient={() => {
              refetch();
              setModals("");
            }}
          />
        )}

        {modals === "edit" && (
          <ModalEditClient
            isOpen={modals === "edit"}
            onClose={() => setModals("")}
            onCloseAndGetClient={() => {
              refetch();
              setModals("");
            }}
            client={clients?.data.find((client) => client.id === itemSelected)}
          />
        )}

        {modals === "disable" && (
          <ModalDisableClient
            isOpen={modals === "disable"}
            onClose={() => setModals("")}
            onCloseAndGetClient={() => {
              refetch();
              setModals("");
            }}
            client={clients?.data.find((client) => client.id === itemSelected)}
          />
        )}

        {modals === "active" && (
          <ModalActiveClient
            isOpen={modals === "active"}
            onClose={() => setModals("")}
            onCloseAndGetClient={() => {
              refetch();
              setModals("");
            }}
            client={clients?.data.find((client) => client.id === itemSelected)}
          />
        )}

        {modals === "search" && (
          <ModalSearchClient
            isOpen={modals === "search"}
            onClose={() => setModals("")}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default ClientPage;
