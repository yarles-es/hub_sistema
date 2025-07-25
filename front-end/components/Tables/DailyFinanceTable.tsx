import ButtonActionDelete from "../Buttons/ButtonActionDelete";
import ButtonActionEdit from "../Buttons/ButtonActionEdit";
import ButtonActionPayment from "../Buttons/ButtonActionPayment";

import DefaultTableContainer from "./DefaultTableContainer";

import useOrderTable from "@/hooks/useOrderTable";
import useViewPermission from "@/hooks/useViewPermission";
import { Daily } from "@/types/Daily";
import { ModalDailyType } from "@/types/ModalTypes";
import { Title } from "@/types/Tables";
import formatStringDate from "@/utils/formatStringDate";
import { isNotNull } from "@/utils/tableGuardType";

type Props = {
  dailys: Daily[];
  onOpenItemSelect: (id: number, type: ModalDailyType) => void;
};

const DailyFinanceTable: React.FC<Props> = ({ dailys, onOpenItemSelect }) => {
  const administration = useViewPermission();

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "nomeCliente", label: "Cliente", type: "string", order: true },
    { key: "valor", label: "Valor", type: "number", order: true },
    { key: "data", label: "Data", type: "date", order: true },
    {
      key: "formaPagamento",
      label: "Forma de Pagamento",
      type: "string",
      order: true,
    },
    { key: "observacao", label: "Observação", type: "string", order: true },
    { key: "edit", label: "Editar", type: "actions", order: false },
    administration
      ? { key: "delete", label: "Excluir", type: "actions", order: false }
      : null,
    { key: "pay", label: "Pagar", type: "actions", order: false },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: dailyOrders, handleOrder } = useOrderTable({
    data: dailys ?? [],
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
          {dailyOrders.map((daily, key) => (
            <tr
              key={key}
              className="border-b border-gray-200 dark:border-strokedark"
            >
              <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                <p>{daily.id}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{daily.nomeCliente}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p className={`text-success`}>
                  {daily.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{formatStringDate({ date: daily.dataHora })}</p>
              </td>
              <td className="py-5 px-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium text-success bg-success`}
                >
                  {daily.formaPagamento}
                </p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{daily.observacao}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <div className="flex items-center space-x-3.5">
                  <ButtonActionEdit
                    onClick={() => onOpenItemSelect(daily.id, "edit")}
                  />
                </div>
              </td>
              {administration && (
                <td className="py-4 px-4 text-black dark:text-white">
                  <div className="flex items-center space-x-3.5">
                    <ButtonActionDelete
                      onClick={() => onOpenItemSelect(daily.id, "delete")}
                    />
                  </div>
                </td>
              )}
              <td className="py-4 px-4 text-black dark:text-white">
                <div className="flex items-center space-x-3.5">
                  <ButtonActionPayment
                    onClick={() => onOpenItemSelect(daily.id, "pay")}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DefaultTableContainer>
  );
};

export default DailyFinanceTable;
