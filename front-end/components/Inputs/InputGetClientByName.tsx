import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { FieldError } from "react-hook-form";

import DefaultFormTableContainer from "../FormTables/DefaultFormTableContainer";

import { getClientByName } from "@/api/client/client.api";
import useOrderTable from "@/hooks/useOrderTable";
import { Client } from "@/types/Client";
import { Title } from "@/types/Tables";
import formatStringDate from "@/utils/formatStringDate";
import { isNotNull } from "@/utils/tableGuardType";

import Input from "./Input";

type Props = {
  selectClient: (client: Client | null) => void;
  errorInput?: FieldError | undefined;
};

const InputGetClientByName: React.FC<Props> = ({
  selectClient,
  errorInput,
}) => {
  const [clientName, setClientName] = useState<string>("");
  const [clientSelected, setClientSelected] = useState<Client | null>(null);

  const [debouncedName, setDebouncedName] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(clientName);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [clientName]);

  const title: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    {
      key: "nome",
      label: "Nome",
      type: "string",
      order: true,
    },
    { key: "email", label: "Email", type: "string", order: false },
    { key: "telefone", label: "Telefone", type: "string", order: false },
    {
      key: "dataNascimento",
      label: "Data Nascimento",
      type: "date",
      order: false,
    },
    { key: "plano", label: "Plano", type: "string", order: false },
  ];

  const { data: clients, error } = useQuery<Client[]>({
    queryKey: ["getClientByName", { name: debouncedName }],
    queryFn: () => {
      if (debouncedName.length < 3) return Promise.resolve([]);
      return getClientByName(debouncedName);
    },
    retry: 0,
    staleTime: 0,
  });

  const titlesFiltered = title.filter(isNotNull);

  const { dataOrder: itemsOrder, handleOrder } = useOrderTable({
    data: clients || [],
    titles: titlesFiltered,
  });

  const handleOrderClick = (title: Title) => {
    if (!title.order) return;
    return () => handleOrder(title.key);
  };

  const handleSelectClient = (client: Client) => {
    if (clientSelected?.id === client.id) {
      setClientSelected(null);
      selectClient(null);
    } else {
      setClientSelected(client);
      selectClient(client);
    }
  };

  return (
    <div>
      <div className="w-full lg:w-3/4 lg:mx-auto mt-4">
        <Input
          name="clientName"
          type="text"
          placeholder="Digite o nome do cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value.toUpperCase())}
          className="text-center"
          error={errorInput?.message}
          errorClassName="text-center"
        />
      </div>
      <DefaultFormTableContainer maxH="h-40">
        <thead className="bg-gray-50 top-0 sticky z-1">
          <tr className="bg-gray-3 text-left text-sm dark:bg-meta-4">
            {titlesFiltered.map((title, key) =>
              key === 0 ? (
                <th
                  onClick={handleOrderClick(title)}
                  id={title.key}
                  key={key}
                  className={`py-4 px-4 font-medium text-black dark:text-white xl:pl-11 ${
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
                  className={`py-4 px-4 font-medium text-black dark:text-white ${
                    title.order ? "cursor-pointer" : ""
                  }`}
                >
                  {title.label}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {itemsOrder.map((item, key) => (
            <tr
              key={key}
              onClick={() => handleSelectClient(item)}
              className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-meta-4 ${
                clientSelected?.id === item.id ? "bg-meta-4" : ""
              }`}
            >
              <td className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {item.id}
              </td>
              <td className="py-4 px-4 font-medium text-black dark:text-white max-w-[200px]">
                {item.nome.toUpperCase()}
              </td>
              <td className="py-4 px-4 font-medium text-black dark:text-white">
                {item.email || "N/A"}
              </td>
              <td className="py-4 px-4 font-medium text-black dark:text-white">
                {item.telefone || "N/A"}
              </td>
              <td className="py-4 px-4 font-medium text-black dark:text-white">
                {formatStringDate({ date: item.dataNascimento }) || "N/A"}
              </td>
              <td className="py-4 px-4 font-medium text-black dark:text-white">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-success text-success`}
                >
                  {item.nomePlano}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </DefaultFormTableContainer>
      <div className="text-green-500 text-center mt-4 h-5 mb-4">
        <p> Cliente Selecionado:</p>
        <p>
          <strong className="text-success">
            {clientSelected && clientSelected.nome.toUpperCase()}
          </strong>
        </p>
      </div>
      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>Erro ao buscar clientes: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default InputGetClientByName;
