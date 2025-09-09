import useOrderTable from "@/hooks/useOrderTable";
import { Log } from "@/types/Log";
import { ModalLogType } from "@/types/ModalTypes";
import { Title } from "@/types/Tables";
import { formatDateWithHours } from "@/utils/formatStringDate";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";

type Props = {
  logs: Log[];
  onOpenItemSelect: (id: number, type: ModalLogType) => void;
};

const LogsTable: React.FC<Props> = ({ logs, onOpenItemSelect }) => {
  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "string", order: false },
    { key: "usuario", label: "Usuário", type: "string", order: false },
    { key: "acao", label: "Ação", type: "string", order: false },
    { key: "cliente", label: "Cliente", type: "string", order: false },
    { key: "datahora", label: "Data", type: "date", order: false },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: logsOrders, handleOrder } = useOrderTable({
    data: logs ?? [],
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
          {logsOrders.map((log, key) => (
            <tr
              key={key}
              className="border-b border-gray-200 dark:border-strokedark"
            >
              <td className="py-4 px-4 text-black dark:text-white xl:pl-11 w-[30px]">
                <p>{log.id}</p>
              </td>
              <td className="py-4 px-4 text-primary dark:text-secondary max-w-[80px] font-bold">
                <p>{log.nomeUsuario}</p>
              </td>
              <td className="py-4 px-4 text-warning dark:text-warning max-w-[100px] font-medium">
                <p>{log.acao}</p>
              </td>
              <td className="py-4 px-4 text-primary dark:text-secondary max-w-[80px] font-bold">
                <p>{log.nomeCliente ?? ""}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{formatDateWithHours(new Date(log.dataHora))}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DefaultTableContainer>
  );
};

export default LogsTable;
