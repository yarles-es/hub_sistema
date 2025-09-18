import { useState } from "react";

import ButtonActionDelete from "../Buttons/ButtonActionDelete";
import CheckBox from "../CheckBox/CheckBox";

import useAlert from "@/hooks/useAlert";
import useOrderTable from "@/hooks/useOrderTable";
import { ModalSalesReportType } from "@/types/ModalTypes";
import { ProductSales } from "@/types/ProductSales";
import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";

type Props = {
  productSales?: ProductSales[];
  onOpenItemSelect: (id: number, type: ModalSalesReportType) => void;
  totalSales?: number;
  totalCost?: number;
  totalProfit?: number;
};

const ProductSalesTable: React.FC<Props> = ({
  onOpenItemSelect,
  productSales,
  totalSales,
  totalCost,
  totalProfit,
}) => {
  const alert = useAlert();
  const [viewPriceCost, setViewPriceCost] = useState(false);

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "produto.nome", label: "Produto", type: "string", order: true },
    { key: "quantidade", label: "Quantidade", type: "number", order: true },
    viewPriceCost
      ? {
          key: "valorCusto",
          label: "Valor de Custo",
          type: "number",
          order: true,
        }
      : null,
    { key: "valorVenda", label: "Valor de Venda", type: "number", order: true },
    { key: "dataVenda", label: "Data da Venda", type: "string", order: true },
    { key: "delete", label: "Deletar", type: "actions", order: false },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: productSalesOrder, handleOrder } = useOrderTable({
    data: productSales ?? [],
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
      {productSales && productSales.length > 0 ? (
        <>
          <div className="flex justify-center items-center mb-2">
            <CheckBox
              classLabel="m-2 text-xs text-white"
              id="preco-custo"
              checked={viewPriceCost}
              onChange={(e) => setViewPriceCost(e.target.checked)}
            >
              <span className="text-white">Ver preço de custo</span>
            </CheckBox>
          </div>
          <div className="flex items-center gap-2 2xsm:gap-4 justify-center mb-2">
            <div
              className={`inline-flex cursor-pointer select-none rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95 bg-warning text-warning`}
              title="Ver total vendas"
            >
              total vendas:{" "}
              {totalSales?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) ?? "R$ 0,00"}
            </div>
            {viewPriceCost && (
              <div
                className={`inline-flex cursor-pointer select-none rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95 bg-danger text-danger`}
                title="ver total custo"
              >
                total custo:{" "}
                {totalCost?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) ?? "R$ 0,00"}
              </div>
            )}
            <div
              className={`inline-flex cursor-pointer select-none rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95 bg-success text-success`}
              title="Ver total lucro"
            >
              total lucro:{" "}
              {totalProfit?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) ?? "R$ 0,00"}
            </div>
          </div>
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
              {productSalesOrder.map((productSale, key) => (
                <tr
                  key={key}
                  className="border-b border-gray-200 dark:border-strokedark"
                >
                  <td className="py-4 px-4 text-black dark:text-white xl:pl-11 w-5">
                    <p>{productSale.id}</p>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white w-[250px] min-w-[200px]">
                    <p>{productSale.produto.nome}</p>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white w-[250px] min-w-[200px]">
                    <p>{productSale.quantidade}</p>
                  </td>
                  {viewPriceCost && (
                    <td className="py-4 px-4 text-black dark:text-white">
                      <p className={`text-danger`}>
                        {productSale.valorCusto.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </td>
                  )}
                  <td className="py-4 px-4 text-black dark:text-white">
                    <p className={`text-success`}>
                      {productSale.valorVenda.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </td>

                  <td className="py-4 px-4 text-black dark:text-white">
                    <p>
                      {new Date(productSale.dataVenda).toLocaleDateString()}{" "}
                      {new Date(productSale.dataVenda).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>

                  <td className="py-4 px-4 text-black dark:text-white">
                    <div className="flex items-center space-x-3.5">
                      <ButtonActionDelete
                        onClick={() =>
                          onOpenItemSelect(productSale.id, "delete")
                        }
                      />
                    </div>
                  </td>
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
    </DefaultTableContainer>
  );
};

export default ProductSalesTable;
