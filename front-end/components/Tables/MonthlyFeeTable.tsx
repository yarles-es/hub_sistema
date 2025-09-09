import { useQuery } from "@tanstack/react-query";

import ButtonActionDelete from "../Buttons/ButtonActionDelete";
import ButtonActionPayment from "../Buttons/ButtonActionPayment";
import ButtonActionUnlink from "../Buttons/ButtonactionUnlink";

import { useMonthlyFeesByClientId } from "@/hooks/queries/monthlyFees/useMonthlyFeesByClientId";
import useOrderTable from "@/hooks/useOrderTable";
import useViewPermission from "@/hooks/useViewPermission";
import { ModalMonthlyFeeType } from "@/types/ModalTypes";
import { MonthlyFeeWithClient } from "@/types/MonthlyFee";
import { Title } from "@/types/Tables";
import formatStringDate from "@/utils/formatStringDate";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";
import DefaultTableContainerSecundary from "./DefaultTableContainerSecundary";

type Props = {
  clientId?: number;
  secundary?: boolean;
  MonthlyFees?: MonthlyFeeWithClient[];
  onOpenItemSelect: (id: number, type: ModalMonthlyFeeType) => void;
};

const MonthlyFeeTable: React.FC<Props> = ({
  MonthlyFees,
  onOpenItemSelect,
  clientId,
  secundary,
}) => {
  const administration = useViewPermission();

  const { data: monthlyFeeData } = useMonthlyFeesByClientId(clientId);

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "cliente.nome", label: "Cliente", type: "string", order: true },
    { key: "valor", label: "Valor", type: "number", order: true },
    {
      key: "dataVencimento",
      label: "Data Vencimento",
      type: "date",
      order: true,
    },
    { key: "status", label: "Status", type: "string", order: true },
    {
      key: "formaPagamento",
      label: "Forma de Pagamento",
      type: "string",
      order: true,
    },
    { key: "valorPago", label: "Valor Pago", type: "number", order: true },
    { key: "cancel", label: "Cancelar", type: "actions", order: false },
    { key: "pay", label: "Pagar", type: "actions", order: false },
    administration && !secundary
      ? { key: "delete", label: "Deletar", type: "actions", order: false }
      : null,
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: monthlyFeesOrder, handleOrder } = useOrderTable({
    data: MonthlyFees ? MonthlyFees : monthlyFeeData || [],
    titles: titlesFiltered,
  });

  const handleOrderClick = (title: Title) => {
    if (!title.order) {
      return;
    }
    return () => handleOrder(title.key);
  };

  const TableContainer = secundary
    ? DefaultTableContainerSecundary
    : DefaultTableContainer;

  return (
    <TableContainer>
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
          {monthlyFeesOrder.map((monthlyFee, key) => (
            <tr
              key={key}
              className="border-b border-gray-200 dark:border-strokedark"
            >
              <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                <p>{monthlyFee.id}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{monthlyFee.cliente.nome}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p className={`text-success`}>
                  {monthlyFee.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{formatStringDate({ date: monthlyFee.vencimento })}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
                    monthlyFee.status === "PAGO"
                      ? "bg-success text-success"
                      : monthlyFee.status === "PENDENTE"
                      ? "bg-warning text-warning"
                      : "bg-danger text-danger"
                  }`}
                >
                  {monthlyFee.status}
                </p>
              </td>
              <td className="py-5 px-4 dark:border-strokedark">
                {monthlyFee.formaPagamento ? (
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium text-success bg-success`}
                  >
                    {monthlyFee.formaPagamento}
                  </p>
                ) : null}
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                {monthlyFee.valorPago && (
                  <p className={`text-success`}>
                    {monthlyFee.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                )}
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <div className="flex items-center space-x-3.5">
                  {monthlyFee.status !== "CANCELADO" &&
                    monthlyFee.status !== "PAGO" && (
                      <ButtonActionUnlink
                        onClick={() =>
                          onOpenItemSelect(monthlyFee.id, "cancel")
                        }
                      />
                    )}
                </div>
              </td>

              <td className="py-4 px-4 text-black dark:text-white">
                <div className="flex items-center space-x-3.5">
                  {monthlyFee.status !== "CANCELADO" &&
                    monthlyFee.status !== "PAGO" && (
                      <ButtonActionPayment
                        onClick={() => onOpenItemSelect(monthlyFee.id, "pay")}
                      />
                    )}
                </div>
              </td>

              {administration && !secundary && (
                <td className="py-4 px-4 text-black dark:text-white">
                  <div className="flex items-center space-x-3.5">
                    <ButtonActionDelete
                      onClick={() => onOpenItemSelect(monthlyFee.id, "delete")}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default MonthlyFeeTable;
