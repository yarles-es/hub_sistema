import { useGetAllbyBirthdayMonth } from "@/hooks/queries/clients/useGetAllbyBirthdayMonth";
import { Client } from "@/types/Client";
import { Title } from "@/types/Tables";
import formatStringDate from "@/utils/formatStringDate";
import { isNotNull } from "@/utils/tableGuardType";

const BirthdayPeopleTable: React.FC = () => {
  const titles: Array<Title | null> = [
    {
      key: "nome",
      label: "Nome",
      type: "string",
      order: false,
    },
    {
      key: "nascimento",
      label: "Data de Nascimento",
      type: "date",
      order: false,
    },
  ];

  const titlesFiltered = titles.filter(isNotNull);

  const { data } = useGetAllbyBirthdayMonth();

  const validateBirthdayNow = (client: Client) => {
    const today = new Date();
    const birthDate = new Date(client.dataNascimento);
    return (
      birthDate.getMonth() === today.getMonth() &&
      birthDate.getDate() === today.getDate()
    );
  };

  return (
    <>
      <p className="m-5 text-center text-base font-bold text-black dark:text-white">
        Aniversáriantes do Mês
      </p>
      <div className="rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto max-h-[calc(100dvh-175px)] md:max-h-[calc(100vh-200px)]  overscroll-none">
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
            {data?.map((client) => (
              <tr
                key={client.id}
                className="border-b border-gray-200 dark:border-strokedark"
              >
                <td className={`py-4 px-4 text-black dark:text-white `}>
                  <p
                    className={`${
                      validateBirthdayNow(client)
                        ? "font-bold text-success"
                        : ""
                    }`}
                  >
                    {client.nome}
                  </p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  {formatStringDate({ date: client.dataNascimento })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BirthdayPeopleTable;
