import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import useAlert from "@/hooks/useAlert";
import { useActiveClient } from "@/hooks/useQuery/clients/useActiveClient";
import { Client } from "@/types/Client";

type Props = {
  client: Client | undefined;
  onClose: () => void;
};

const FormActiveClient = ({ client, onClose }: Props) => {
  const alert = useAlert();

  const { mutate } = useActiveClient({
    onSuccess: () => {
      alert(`Cliente ativado com sucesso`, "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  if (!client) {
    alert("Cliente selecionado não encontrado", "error");
    return null;
  }

  const handleSubmit = () => {
    mutate(client.id);
  };

  return (
    <DefaultFormatContainerForm title="Desativação de cliente">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full flex flex-col justify-center items-center text-center">
              <h1 className="mb-4">
                <strong className="text-meta-3 text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a ativar o cliente{" "}
                <strong className="text-meta-3 text-lg">
                  {client?.nome || "desconhecido"}
                </strong>
                .
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Lembre-se que essa ação irá ativar o cliente, e gerar uma nova
                mensalidade com o vencimento na data atual de hoje.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex w-full lg:w-100 justify-center rounded p-3"
              success
            >
              Ativar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormActiveClient;
