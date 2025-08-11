import DefaultFormTableContainer from "./DefaultFormTableContainer";

import useOrderTable from "@/hooks/useOrderTable";
import { Title } from "@/types/Tables";
import { RegisterTurnstile } from "@/types/Turnstile";
import { isNotNull } from "@/utils/tableGuardType";

type Props = {
  turnstileRegister: RegisterTurnstile;
};

const TableRegisterTurnstile = ({ turnstileRegister }: Props) => {
  const title: Array<Title | null> = [
    { key: "name", label: "Nome", type: "string", order: true },
    { key: "idCatraca", label: "ID Catraca", type: "number", order: true },
    {
      key: "primeiraEtapa",
      label: "Primeira Etapa",
      type: "boolean",
      order: true,
    },
    {
      key: "segundaEtapa",
      label: "Segunda Etapa",
      type: "boolean",
      order: true,
    },
    {
      key: "terceiraEtapa",
      label: "Terceira Etapa",
      type: "boolean",
      order: true,
    },
  ];

  const titlesFiltered = title.filter(isNotNull);

  const { dataOrder: itensOrder, handleOrder } = useOrderTable({
    data: turnstileRegister ? [turnstileRegister] : [],
    titles: titlesFiltered,
  });

  const handleOrderClick = (title: Title) => {
    if (!title.order) return;
    return () => handleOrder(title.key);
  };

  return (
    <DefaultFormTableContainer maxH="max-h-100">
      <thead className="bg-gray-50 sticky top-0">
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          {titlesFiltered.map((title, key) =>
            key === 0 ? (
              <th
                onClick={handleOrderClick(title)}
                id={title.key}
                key={key}
                className={`py-4 px-4 font-medium text-black dark:text-white xl:pl-11 max-w-15 ${
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
        {itensOrder.map((item, key) => (
          <tr
            key={key}
            className="border-b border-stroke dark:border-strokedark"
          >
            <td className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              {item.nomeCliente}
            </td>
            <td className="py-4 px-4 font-medium text-black dark:text-white">
              {item.idCatraca}
            </td>
            <td className="py-4 px-4 font-medium text-black dark:text-white">
              {item.primeiraEtapa ? "Sim" : "Não"}
            </td>
            <td className="py-4 px-4 font-medium text-black dark:text-white">
              {item.segundaEtapa ? "Sim" : "Não"}
            </td>
            <td className="py-4 px-4 font-medium text-black dark:text-white">
              {item.terceiraEtapa ? "Sim" : "Não"}
            </td>
          </tr>
        ))}
      </tbody>
    </DefaultFormTableContainer>
  );
};

export default TableRegisterTurnstile;
