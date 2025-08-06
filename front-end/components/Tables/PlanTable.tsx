import { useQueryClient } from "@tanstack/react-query";

import ButtonActionAdd from "../Buttons/ButtonActionAdd";
import ButtonActionEdit from "../Buttons/ButtonActionEdit";
import ButtonActionUnlink from "../Buttons/ButtonactionUnlink";

import useAlert from "@/hooks/useAlert";
import useOrderTable from "@/hooks/useOrderTable";
import { ModalPlanType } from "@/types/ModalTypes";
import { Plano } from "@/types/Plano";
import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";

type Props = {
  plans: Plano[];
  onOpenItemSelect: (id: number, type: ModalPlanType) => void;
};

const PlanTable: React.FC<Props> = ({ plans, onOpenItemSelect }) => {
  const alert = useAlert();
  const queryClient = useQueryClient();

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "nome", label: "Nome", type: "string", order: true },
    { key: "valor", label: "Valor", type: "number", order: true },
    { key: "descricao", label: "Descrição", type: "string", order: true },
    { key: "status", label: "Status", type: "boolean", order: true },
    { key: "edit", label: "Editar", type: "actions", order: false },
    { key: "disable", label: "Desativar", type: "actions", order: false },
    { key: "active", label: "Ativar", type: "actions", order: false },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: planOrders, handleOrder } = useOrderTable({
    data: plans ?? [],
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
          {planOrders.map((plan, key) => (
            <tr
              key={key}
              className="border-b border-gray-200 dark:border-strokedark"
            >
              <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                <p>{plan.id}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p className="inline-flex text-center rounded-full bg-opacity-20 p-1 text-xs px-2 font-bold text-primary bg-primary">
                  {plan.nome}
                </p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p className={`text-success`}>
                  {plan.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white max-w-30">
                <p>{plan.descricao}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
                    plan.ativo
                      ? "bg-success text-success"
                      : "bg-danger text-danger"
                  }`}
                >
                  {plan.ativo ? "ATIVO" : "INATIVO"}
                </p>
              </td>

              <td className="py-4 px-4 text-black dark:text-white">
                <div className="flex items-center space-x-3.5">
                  <ButtonActionEdit
                    onClick={() => onOpenItemSelect(plan.id, "edit")}
                  />
                </div>
              </td>
              <td className="py-4 px-4 text-center text-black dark:text-white">
                <div className="flex space-x-3">
                  {plan.ativo && (
                    <ButtonActionUnlink
                      onClick={() => onOpenItemSelect(plan.id, "disable")}
                    />
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-center text-black dark:text-white">
                <div className="flex space-x-3">
                  {!plan.ativo && (
                    <ButtonActionAdd
                      onClick={() => onOpenItemSelect(plan.id, "active")}
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

export default PlanTable;
