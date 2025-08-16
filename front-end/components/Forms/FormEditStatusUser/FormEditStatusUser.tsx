import { useMutation } from "@tanstack/react-query";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { updateUserStatus } from "@/api/users/user.api";
import Button from "@/components/Buttons/Button";
import useAlert from "@/hooks/useAlert";
import { ModalTypeItemUser } from "@/types/ModalTypes";
import { User } from "@/types/User";

type Props = {
  user: User | undefined;
  onClose: (type: ModalTypeItemUser, error?: string) => void;
};

const FormEditStatusUser = ({ user, onClose }: Props) => {
  const alert = useAlert();

  const { mutate } = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      alert(
        `Usuário ${user!.ativo ? "desativado" : "ativado"} com sucesso`,
        "success"
      );
      onClose("status");
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  if (!user) {
    onClose("status", "Usuário selecionado não encontrado");
    return null;
  }

  const validateStatus = () => {
    if (!user) {
      alert("Usuário selecionado não encontrado", "error");
      return false;
    }
    return true;
  };

  const onOk = () => {
    if (!validateStatus()) return;
    mutate({ status: !user.ativo, userId: user.id });
  };

  return (
    <DefaultFormatContainerForm title="Edição de status do usuário">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full flex flex-col justify-center items-center  text-center">
              <h1 className="mb-4">
                <strong className="text-meta-1 text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a {user.ativo ? "desativar" : "ativar"} o
                usuário{" "}
                <strong className="text-meta-1 text-lg">{user.nome}</strong>.
              </p>
              {user.ativo ? (
                <p className="text-sm text-gray-400 mb-4">
                  Lembre-se que essa ação irá desabilitar o uso do sistema para
                  o usuário. Mas manterá os dados do mesmo.
                </p>
              ) : (
                <p className="text-sm text-gray-400 mb-4">
                  O usuário poderá acessar o sistema novamente após a ativação.
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="button"
              onClick={onOk}
              className="flex w-full lg:w-100 justify-center rounded p-3"
              success={!user.ativo}
              danger={user.ativo}
            >
              {user.ativo ? "Desativar" : "Ativar"} usuário
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormEditStatusUser;
