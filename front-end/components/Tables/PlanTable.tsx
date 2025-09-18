import ButtonActionAdd from "../Buttons/ButtonActionAdd";
import ButtonActionEdit from "../Buttons/ButtonActionEdit";
import ButtonActionUnlink from "../Buttons/ButtonactionUnlink";

import { useActivePlan } from "@/hooks/queries/plans/useActivePlan";
import { useDisablePlan } from "@/hooks/queries/plans/useDisablePlan";
import useAlert from "@/hooks/useAlert";
import useOrderTable from "@/hooks/useOrderTable";
import { ModalPlanType } from "@/types/ModalTypes";
import { Plano } from "@/types/Plano";
import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";

type Props = {
  plans?: Plano[];
  onOpenItemSelect: (id: number, type: ModalPlanType) => void;
};

const PlanTable: React.FC<Props> = ({ plans, onOpenItemSelect }) => {
  const alert = useAlert();

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

  const { mutate: disablePlanMutate } = useDisablePlan({
    onSuccess: () => {
      alert("Plano desativado com sucesso!", "success");
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleDisablePlan = (id: number) => {
    disablePlanMutate(id);
  };

  const { mutate: activatePlanMutate } = useActivePlan({
    onSuccess: () => {
      alert("Plano ativado com sucesso!", "success");
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleActivatePlan = (id: number) => {
    activatePlanMutate(id);
  };

  return (
    <DefaultTableContainer>
      {planOrders?.length > 0 ? (
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
                        onClick={() => handleDisablePlan(plan.id)}
                      />
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-black dark:text-white">
                  <div className="flex space-x-3">
                    {!plan.ativo && (
                      <ButtonActionAdd
                        onClick={() => handleActivatePlan(plan.id)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum plano encontrado.
          </p>
        </div>
      )}
    </DefaultTableContainer>
  );
};

export default PlanTable;
