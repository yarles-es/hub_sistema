import React from "react";

import ButtonActionEdit from "../Buttons/ButtonActionEdit";

import useOrderTable from "@/hooks/useOrderTable";
import useViewPermission from "@/hooks/useViewPermission";
import { ModalTypeItemUser } from "@/types/ModalTypes";
import { Title } from "@/types/Tables";
import { User } from "@/types/User";
import { isNotNull } from "@/utils/tableGuardType";

import DefaultTableContainer from "./DefaultTableContainer";

type TableProps = {
  users: User[] | undefined;
  onOpenItemSelect: (id: number, type: ModalTypeItemUser) => void;
};

const UserSettingsTable: React.FC<TableProps> = ({
  users,
  onOpenItemSelect,
}) => {
  const administration = useViewPermission();

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "nome", label: "Nome", type: "string", order: true },
    { key: "email", label: "Email", type: "string", order: true },

    { key: "status", label: "Status", type: "boolean", order: true },
    administration
      ? { key: "edit", label: "Editar", type: "actions", order: false }
      : null,
  ];

  const handleOrderClick = (title: Title) => {
    if (!title.order) {
      return;
    }
    return () => handleOrder(title.key);
  };

  const titlesFiltered = titles.filter(isNotNull);

  const { dataOrder: usersOrder, handleOrder } = useOrderTable({
    data: users ?? [],
    titles: titlesFiltered,
  });

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
          {usersOrder.map((user, key) => (
            <tr
              key={key}
              className="border-b border-gray-200 dark:border-strokedark"
            >
              <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                <p>{user.id}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{user.nome}</p>
              </td>
              <td className="py-4 px-4 text-black dark:text-white">
                <p>{user.email}</p>
              </td>

              <td className="py-4 px-4 text-center text-black dark:text-white">
                <div className="flex space-x-3">
                  {user.ativo ? (
                    <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-success text-success">
                      ATIVO
                    </p>
                  ) : (
                    <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium bg-danger text-danger">
                      INATIVO
                    </p>
                  )}
                  <ButtonActionEdit
                    onClick={() => onOpenItemSelect(user.id, "status")}
                  />
                </div>
              </td>

              {administration && (
                <td className="py-4 px-4 text-black dark:text-white">
                  <div className="flex items-center space-x-3.5">
                    <ButtonActionEdit
                      onClick={() => onOpenItemSelect(user.id, "edit")}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </DefaultTableContainer>
  );
};

export default UserSettingsTable;
