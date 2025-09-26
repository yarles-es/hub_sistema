import { useState } from "react";

import ButtonActionDelete from "../Buttons/ButtonActionDelete";
import ButtonActionPayment from "../Buttons/ButtonActionPayment";
import ButtonActionUnlink from "../Buttons/ButtonactionUnlink";
import CheckBox from "../CheckBox/CheckBox";

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
  totalPaid?: number;
  totalPix?: number;
  totalCard?: number;
  totalMoney?: number;
};

const MonthlyFeeTable: React.FC<Props> = ({
  MonthlyFees,
  onOpenItemSelect,
  clientId,
  secundary,
  totalPaid,
  totalPix,
  totalCard,
  totalMoney,
}) => {
  const administration = useViewPermission();

  const [viewReport, setViewReport] = useState(false);

  const { data: monthlyFeeData } = useMonthlyFeesByClientId(clientId);

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "cliente.nome", label: "Cliente", type: "string", order: true },
    { key: "valor", label: "Valor", type: "number", order: true },
    {
      key: "dataVencimento",
      label: "Data vencimento",
      type: "date",
      order: true,
    },
    { key: "status", label: "Status", type: "string", order: true },
    {
      key: "formaPagamento",
      label: "Forma de pagamento",
      type: "string",
      order: true,
    },
    {
      key: "dataPagamento",
      label: "Data pagamento",
      type: "date",
      order: true,
    },
    { key: "valorPago", label: "Valor pago", type: "number", order: true },
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
      {monthlyFeesOrder && monthlyFeesOrder.length > 0 ? (
        <>
          {administration && (
            <div className="flex items-center gap-2 2xsm:gap-4 justify-center sticky top-0 z-20 bg-white dark:bg-boxdark">
              <div className="flex justify-center items-center">
                <CheckBox
                  classLabel="m-2 text-xs text-white"
                  id="view-report"
                  checked={viewReport}
                  onChange={(e) => setViewReport(e.target.checked)}
                >
                  <span className="text-white">
                    Ver relatório de pagamentos
                  </span>
                </CheckBox>
              </div>
              {viewReport && (
                <>
                  <div
                    className={`inline-flex cursor-pointer select-none rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95 bg-success text-success`}
                  >
                    pix:{" "}
                    {totalPix?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }) ?? "R$ 0,00"}
                  </div>

                  <div
                    className={`inline-flex cursor-pointer select-none rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95 bg-success text-success`}
                  >
                    cartão:{" "}
                    {totalCard?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }) ?? "R$ 0,00"}
                  </div>

                  <div
                    className={`inline-flex cursor-pointer select-none rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95 bg-success text-success`}
                  >
                    dinheiro:{" "}
                    {totalMoney?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }) ?? "R$ 0,00"}
                  </div>

                  <div
                    className={`inline-flex cursor-pointer select-none rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95 bg-success text-success`}
                  >
                    total:{" "}
                    {totalPaid?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }) ?? "R$ 0,00"}
                  </div>
                </>
              )}
            </div>
          )}
          <table className="w-full table-auto">
            <thead
              className={`bg-gray-50 sticky z-10 ${
                administration && !secundary ? "top-10" : "top-0"
              }`}
            >
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
                    {monthlyFee.dataPagamento && (
                      <p>
                        {new Date(
                          monthlyFee.dataPagamento
                        ).toLocaleDateString()}{" "}
                        {new Date(monthlyFee.dataPagamento).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    )}
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
                            onClick={() =>
                              onOpenItemSelect(monthlyFee.id, "pay")
                            }
                          />
                        )}
                    </div>
                  </td>

                  {administration && !secundary && (
                    <td className="py-4 px-4 text-black dark:text-white">
                      <div className="flex items-center space-x-3.5">
                        <ButtonActionDelete
                          onClick={() =>
                            onOpenItemSelect(monthlyFee.id, "delete")
                          }
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhuma movimentação financeira encontrada
          </p>
        </div>
      )}
    </TableContainer>
  );
};

export default MonthlyFeeTable;
