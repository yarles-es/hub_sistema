import React, { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import ButtonActionAdd from "../Buttons/ButtonActionAdd";
import ButtonActionEdit from "../Buttons/ButtonActionEdit";
import ButtonActionNew from "../Buttons/ButtonActionNew";
import ButtonActionUnlink from "../Buttons/ButtonactionUnlink";
import PageTransition from "../PageTransition/PageTransition";

import { createMonthlyFee } from "@/api/monthlyFee/monthlyFee.api";
import useAlert from "@/hooks/useAlert";
import useOrderTable from "@/hooks/useOrderTable";
import { Client } from "@/types/Client";
import { ModalClientType } from "@/types/ModalTypes";
import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";
import MonthlyFeeTable from "./MonthlyFeeTable";

type ExpandedRows = {
  [key: number]: boolean;
};

type Props = {
  clients: Client[];
  onOpenItemSelect: (id: number, type: ModalClientType) => void;
};

const ClientTable: React.FC<Props> = ({ clients, onOpenItemSelect }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();

  const [expandedRows, setExpandedRows] = useState<ExpandedRows>({});

  const toggleRowExpansion = (key: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [key]: !prevExpandedRows[key],
    }));
  };

  const titles: Array<Title | null> = [
    { key: "costOrExpense", label: "Parcelas", type: "string", order: false },
    { key: "id", label: "ID", type: "number", order: true },
    { key: "nome", label: "Nome", type: "string", order: true },
    { key: "catracaId", label: "Catraca ID", type: "number", order: true },
    { key: "email", label: "Email", type: "string", order: true },
    { key: "telefone", label: "Telefone", type: "string", order: true },
    {
      key: "dataNascimento",
      label: "Data Nascimento",
      type: "date",
      order: true,
    },
    { key: "nomePlano", label: "Plano", type: "string", order: true },
    { key: "status", label: "Status", type: "boolean", order: true },
    {
      key: "monthlyFee",
      label: "Nova Mensalidade",
      type: "actions",
      order: false,
    },

    { key: "edit", label: "Editar", type: "actions", order: false },
    {
      key: "disable",
      label: "Desativar",
      type: "actions",
      order: false,
    },
    {
      key: "enable",
      label: "Ativar",
      type: "actions",
      order: false,
    },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: clientsOrder, handleOrder } = useOrderTable({
    data: clients ?? [],
    titles: titlesFiltered,
  });

  const handleOrderClick = (title: Title) => {
    if (!title.order) {
      return;
    }
    return () => handleOrder(title.key);
  };

  const { mutate } = useMutation({
    mutationFn: async (clientId: number) => await createMonthlyFee(clientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllClients"] });
      alert("Mensalidade criada com sucesso!", "success");
    },
    onError: (error: Error) => {
      alert(error.message, "error");
    },
  });

  const onCreateMonthlyFee = (clientId: number) => {
    mutate(clientId);
  };

  return (
    <DefaultTableContainer>
      <table className="w-full table-auto">
        <thead className="bg-gray-50 sticky top-0 z-1">
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {titlesFiltered.map((title, key) =>
              key === 0 ? (
                <th
                  onClick={handleOrderClick(title)}
                  id={title.key}
                  key={key}
                  className={`px-4 md:py-2 font-medium text-black dark:text-white xl:pl-11 ${
                    title.order ? "cursor-pointer" : ""
                  }`}
                >
                  {title.label}
                </th>
              ) : (
                <th
                  onClick={handleOrderClick(title)}
                  id={title.key}
                  key={key}
                  className={`px-4 md:py-2 font-medium text-black dark:text-white ${
                    title.order ? "cursor-pointer" : ""
                  }`}
                >
                  {title.label}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="text-xs">
          {clientsOrder.map((client, key) => (
            <React.Fragment key={key}>
              <tr
                key={key}
                className="border-b border-gray-200 dark:border-strokedark"
              >
                <td
                  onClick={() => toggleRowExpansion(key)}
                  className={`border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-xs w-[40px]`}
                >
                  <svg
                    className={` fill-current ${
                      expandedRows[key] ? "" : "rotate-180"
                    } cursor-pointer`}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <p>{client.id}</p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white min-w-[150px]">
                  <p>{client.nome}</p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  {client.catracaId ? (
                    <p>{client.catracaId}</p>
                  ) : (
                    <div className="flex space-x-3">
                      <ButtonActionNew
                        onClick={() =>
                          onOpenItemSelect(client.id, "linkTurnstile")
                        }
                      />
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <p>{client.email}</p>
                </td>

                <td className="py-4 px-4 text-black dark:text-white min-w-[130px]">
                  <p>
                    {client.telefone.replace(
                      /^(\d{2})(\d{5})(\d{4})$/,
                      "($1) $2-$3"
                    )}
                  </p>
                </td>

                <td className="py-4 px-4 text-black dark:text-white">
                  <p>{new Date(client.dataNascimento).toLocaleDateString()}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="inline-flex text-center rounded-full bg-opacity-20 p-1 text-xs px-2 font-bold text-primary bg-primary">
                    {client.nomePlano}
                  </p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
                      client.status === "ATIVO"
                        ? "bg-success text-success"
                        : client.status === "MENSALIDADE_AUSENTE"
                        ? "bg-warning text-warning"
                        : client.status === "ISENTO"
                        ? "bg-meta-5 text-meta-5"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {client.status}
                  </p>
                </td>
                <td className="py-4 px-4 text-center text-black dark:text-white">
                  {client.status === "MENSALIDADE_AUSENTE" && (
                    <div className="flex space-x-3">
                      <ButtonActionNew
                        onClick={() => onCreateMonthlyFee(client.id)}
                      />
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 text-center text-black dark:text-white">
                  <div className="flex space-x-3">
                    <ButtonActionEdit
                      onClick={() => onOpenItemSelect(client.id, "edit")}
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-black dark:text-white">
                  <div className="flex space-x-3">
                    {(client.status === "ATIVO" ||
                      client.status === "MENSALIDADE_AUSENTE") && (
                      <ButtonActionUnlink
                        onClick={() => onOpenItemSelect(client.id, "disable")}
                      />
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-black dark:text-white">
                  <div className="flex space-x-3">
                    {client.status === "DESATIVADO" && (
                      <ButtonActionAdd
                        onClick={() => onOpenItemSelect(client.id, "active")}
                      />
                    )}
                  </div>
                </td>
              </tr>

              {expandedRows[key] && (
                <tr>
                  <td colSpan={17}>
                    <PageTransition>
                      <MonthlyFeeTable
                        secundary
                        clientId={client.id}
                        onOpenItemSelect={onOpenItemSelect}
                      />
                    </PageTransition>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </DefaultTableContainer>
  );
};

export default ClientTable;
