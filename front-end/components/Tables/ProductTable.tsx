import { useState } from "react";

import ButtonActionAdd from "../Buttons/ButtonActionAdd";
import ButtonActionDelete from "../Buttons/ButtonActionDelete";
import ButtonActionEdit from "../Buttons/ButtonActionEdit";
import ButtonActionPayment from "../Buttons/ButtonActionPayment";
import ButtonActionUnlink from "../Buttons/ButtonactionUnlink";
import CheckBox from "../CheckBox/CheckBox";

import { useUpdateStatusProduct } from "@/hooks/queries/products/useUpdateStatusProduct";
import useAlert from "@/hooks/useAlert";
import useOrderTable from "@/hooks/useOrderTable";
import { ModalProdutType } from "@/types/ModalTypes";
import { Product } from "@/types/product";
import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";

type Props = {
  products?: Product[];
  onOpenItemSelect: (id: number, type: ModalProdutType) => void;
};

const ProductTable: React.FC<Props> = ({ products, onOpenItemSelect }) => {
  const alert = useAlert();
  const [viewPriceCost, setViewPriceCost] = useState(false);
  const [viewDisableProduts, setViewDisableProduts] = useState(false);

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "name", label: "Nome", type: "string", order: true },
    { key: "description", label: "Descrição", type: "string", order: true },
    viewPriceCost
      ? {
          key: "priceCost",
          label: "Preço de Custo",
          type: "number",
          order: true,
        }
      : null,
    { key: "priceSale", label: "Preço de venda", type: "number", order: true },
    { key: "stock", label: "Estoque", type: "number", order: true },
    { key: "status", label: "Status", type: "boolean", order: true },
    { key: "edit", label: "Editar", type: "actions", order: false },
    { key: "disable", label: "Desativar", type: "actions", order: false },
    { key: "activate", label: "Ativar", type: "actions", order: false },
    { key: "delete", label: "Deletar", type: "actions", order: false },
    { key: "sell", label: "vender", type: "number", order: true },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: productOrders, handleOrder } = useOrderTable({
    data: products ?? [],
    titles: titlesFiltered,
  });

  const handleOrderClick = (title: Title) => {
    if (!title.order) {
      return;
    }
    return () => handleOrder(title.key);
  };

  const productFiltered = productOrders.filter((product) =>
    viewDisableProduts ? product : product.ativo
  );

  const { mutate: mutateStatus } = useUpdateStatusProduct({
    onSuccess: (_data, variables) => {
      alert(
        variables.ativo
          ? "Produto ativado com sucesso!"
          : "Produto desabilitado com sucesso!",
        "success"
      );
    },
    onError: () => {
      alert("Erro ao atualizar status do produto, tente novamente!", "error");
    },
  });

  return (
    <DefaultTableContainer>
      {productFiltered.length > 0 ? (
        <>
          <div className="flex justify-center items-center mb-4">
            <CheckBox
              classLabel="m-2 text-xs text-white"
              id="preco-custo"
              checked={viewPriceCost}
              onChange={(e) => setViewPriceCost(e.target.checked)}
            >
              <span className="text-white">Ver preço de custo</span>
            </CheckBox>
            <CheckBox
              classLabel="m-2 text-xs text-white"
              id="desativados"
              checked={viewDisableProduts}
              onChange={(e) => setViewDisableProduts(e.target.checked)}
            >
              <span className="text-white">Ver produtos desativados</span>
            </CheckBox>
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
              {productFiltered.map((product, key) => (
                <tr
                  key={key}
                  className="border-b border-gray-200 dark:border-strokedark"
                >
                  <td className="py-4 px-4 text-black dark:text-white xl:pl-11 w-5">
                    <p>{product.id}</p>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white w-[250px] min-w-[200px]">
                    <p>{product.nome}</p>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    <p>{product.descricao}</p>
                  </td>
                  {viewPriceCost && (
                    <td className="py-4 px-4 text-black dark:text-white">
                      <p className={`text-danger`}>
                        {product.valorCusto.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </td>
                  )}
                  <td className="py-4 px-4 text-black dark:text-white">
                    <p className={`text-success`}>
                      {product.valorVenda.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    <p>{product.estoque}</p>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
                        product.ativo
                          ? "bg-success text-success"
                          : "bg-danger text-danger"
                      }`}
                    >
                      {product.ativo ? "Ativo" : "Inativo"}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    <div className="flex items-center space-x-3.5">
                      <ButtonActionEdit
                        onClick={() => onOpenItemSelect(product.id, "edit")}
                      />
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center text-black dark:text-white">
                    <div className="flex space-x-3">
                      {product.ativo && (
                        <ButtonActionUnlink
                          onClick={() =>
                            mutateStatus({ id: product.id, ativo: false })
                          }
                        />
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center text-black dark:text-white">
                    <div className="flex space-x-3">
                      {!product.ativo && (
                        <ButtonActionAdd
                          onClick={() =>
                            mutateStatus({ id: product.id, ativo: true })
                          }
                        />
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-black dark:text-white">
                    <div className="flex items-center space-x-3.5">
                      <ButtonActionDelete
                        onClick={() => onOpenItemSelect(product.id, "delete")}
                      />
                    </div>
                  </td>

                  <td className="py-4 px-4 text-black dark:text-white">
                    <div className="flex items-center space-x-3.5">
                      <ButtonActionPayment
                        onClick={() => onOpenItemSelect(product.id, "sell")}
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
            Nenhum produto encontrado
          </p>
        </div>
      )}
    </DefaultTableContainer>
  );
};

export default ProductTable;
