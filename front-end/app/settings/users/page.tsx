"use client";
import { useEffect, useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import ModalCreateUser from "@/components/Modals/UserModals/ModalCreateUser";
import ModalEditStatusUser from "@/components/Modals/UserModals/ModalEditStatusUser";
import ModalEditUser from "@/components/Modals/UserModals/ModalEditUser";
import PageTransition from "@/components/PageTransition/PageTransition";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import UserSettingsTable from "@/components/Tables/UserSettingsTable";
import { useGetAllUsers } from "@/hooks/queries/users/useGetAllUsers";
import useAlert from "@/hooks/useAlert";
import useViewPermission from "@/hooks/useViewPermission";
import { ModalTypeItemUser } from "@/types/ModalTypes";
import { EditedUserData } from "@/types/User";

const UsersPage = () => {
  const [modalCreateUser, setModalCreateUser] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [itemSelected, setItemSelected] = useState<number>(0);

  const administration = useViewPermission();

  const alert = useAlert();

  const objectVisionModals = {
    create: setModalCreateUser,
    edit: setModalEdit,
    status: setModalStatus,
  };

  const { data: users, error, refetch } = useGetAllUsers();

  useEffect(() => {
    if (error) {
      alert(error.message, "error");
    }
  }, [error, alert]);

  const onOpenItemSelect = (id: number, type: ModalTypeItemUser) => {
    if (!id || id < 1) {
      alert("Seleção inválida. Por favor, selecione um item válido.", "error");
      return;
    }
    setItemSelected(id);
    objectVisionModals[type](true);
  };

  const onCloseAndGetUsers = () => {
    setModalCreateUser(false);
    refetch();
  };

  const onCloseTypeModal = (type: ModalTypeItemUser, error?: string) => {
    objectVisionModals[type](false);
    setItemSelected(0);
    if (!error) refetch();
    else alert(error, "error");
  };

  const filteredInfoEditUserData = (
    user: EditedUserData
  ): EditedUserData | undefined => {
    if (user) {
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        administrador: user.administrador,
        senha: "",
        ativo: user.ativo,
      };
    }
  };

  const userSelected =
    users && users.length > 0
      ? users.find((user) => user.id === itemSelected)
      : null;

  return (
    <PageTransition>
      <div>
        <Breadcrumb pageName="Usuários" />

        <HeaderTable viewHeader={administration}>
          {administration && (
            <Button header onClick={() => objectVisionModals["create"](true)}>
              <p>Novo Usuário</p>
            </Button>
          )}
        </HeaderTable>
      </div>

      <div className="flex flex-col gap-4">
        <div className="mt-1.5 xl:mt-3">
          <UserSettingsTable
            users={users}
            onOpenItemSelect={onOpenItemSelect}
          />
        </div>

        {modalCreateUser && (
          <ModalCreateUser
            isOpen={modalCreateUser}
            onClose={() => objectVisionModals["create"](false)}
            onCloseAndGetUsers={onCloseAndGetUsers}
          />
        )}

        {userSelected && modalStatus && (
          <ModalEditStatusUser
            isOpen={modalStatus}
            onClose={() => objectVisionModals["status"](false)}
            userSelected={userSelected}
            onCloseTypeModal={onCloseTypeModal}
          />
        )}

        {userSelected && modalEdit && (
          <ModalEditUser
            isOpen={modalEdit}
            onClose={() => objectVisionModals["edit"](false)}
            user={filteredInfoEditUserData(userSelected)}
            onCloseTypeModal={onCloseTypeModal}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default UsersPage;
