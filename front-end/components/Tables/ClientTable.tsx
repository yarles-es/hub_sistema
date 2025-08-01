import ButtonActionAdd from "../Buttons/ButtonActionAdd";
import ButtonActionEdit from "../Buttons/ButtonActionEdit";
import ButtonActionUnlink from "../Buttons/ButtonactionUnlink";

import useOrderTable from "@/hooks/useOrderTable";
import useViewPermission from "@/hooks/useViewPermission";
import { Client } from "@/types/Client";
import { ModalClientType } from "@/types/ModalTypes";
import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";

type Props = {
  clients: Client[];
  onOpenItemSelect: (id: number, type: ModalClientType) => void;
};

const ClientTable: React.FC<Props> = ({ clients, onOpenItemSelect }) => {
  const administration = useViewPermission();

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "nome", label: "Nome", type: "string", order: true },
    { key: "email", label: "Email", type: "string", order: true },
    { key: "telefone", label: "Telefone", type: "string", order: true },
    {
      key: "dataNascimento",
      label: "Data Nascimento",
      type: "date",
      order: true,
    },
    { key: "status", label: "Status", type: "boolean", order: true },

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
            <tr
              key={key}
              className="border-b border-gray-200 dark:border-strokedark"
            >
              <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                <p>{client.id}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{client.nome}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{client.email}</p>
              </td>

              <td className="py-4 px-4 text-black dark:text-white">
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

              <td className="py-4 px-4 text-black dark:text-white">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
                    client.status === "ATIVO"
                      ? "bg-success text-success"
                      : client.status === "MENSALIDADE_AUSENTE"
                      ? "bg-warning text-warning"
                      : "bg-danger text-danger"
                  }`}
                >
                  {client.status}
                </p>
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
                  {client.status === "ATIVO" && (
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
          ))}
        </tbody>
      </table>
    </DefaultTableContainer>
  );
};

export default ClientTable;
