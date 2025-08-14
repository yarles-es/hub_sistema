import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

import { UseAccessRegistrations } from "@/hooks/useAccessRegistrations";
import { formatDateWithHours } from "@/utils/formatStringDate";

const AccessRegistrationTable = () => {
  const { items } = UseAccessRegistrations();

  const titles: Array<Title | null> = [
    {
      key: "nomeCliente",
      label: "Nome do Cliente",
      type: "string",
      order: false,
    },
    {
      key: "tipoCatraca",
      label: "Tipo de Catraca",
      type: "string",
      order: false,
    },
    { key: "dataHora", label: "Hora e Data", type: "date", order: false },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  return (
    <>
      <p className="m-5 text-center text-base font-bold text-black dark:text-white">
        Registros de Acesso
      </p>
      <div className="rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto h-[calc(100dvh-175px)] md:h-[calc(100vh-200px)]  overscroll-none">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 sticky top-0 z-1">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {titlesFiltered.map((title, key) =>
                key === 0 ? (
                  <th
                    id={title.key}
                    key={key}
                    className={`px-4 md:py-2 font-medium text-black dark:text-white ${
                      title.order ? "cursor-pointer" : ""
                    }`}
                  >
                    {title.label}
                  </th>
                ) : (
                  <th
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
          <tbody>
            {items?.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 dark:border-strokedark"
              >
                <td className="py-4 px-4 text-black dark:text-white">
                  {item.nomeCliente}
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
                      item.tipoCatraca === "ENTRADA"
                        ? "bg-success text-success"
                        : item.tipoCatraca === "SAIDA"
                        ? "bg-warning text-warning"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {item.tipoCatraca}
                  </p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  {formatDateWithHours(new Date(item.dataHora))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccessRegistrationTable;
