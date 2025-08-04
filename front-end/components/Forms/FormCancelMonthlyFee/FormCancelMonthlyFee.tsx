import { useMutation } from "@tanstack/react-query";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { cancelMonthlyFee } from "@/api/monthlyFee/monthlyFee.api";
import Button from "@/components/Buttons/Button";
import useAlert from "@/hooks/useAlert";
import { MonthlyFeeWithClient } from "@/types/MonthlyFee";

type Props = {
  onClose: () => void;
  monthlyFee: MonthlyFeeWithClient | undefined;
};

const FormCancelMonthlyFee: React.FC<Props> = ({ onClose, monthlyFee }) => {
  const alert = useAlert();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (monthlyFee) return cancelMonthlyFee(monthlyFee.id);
    },
    onSuccess: () => {
      alert("Mensalidade cancelada com sucesso!", "success");
      onClose();
    },
    onError: (error: any) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleCancel = () => {
    mutate();
  };

  return (
    <DefaultFormatContainerForm title="Cancelar Mensalidade">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="mb-4">
                <strong className="text-meta-1 text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a cancelar a mensalidade ativa do cliente:{" "}
                <strong className="text-meta-1 text-lg">
                  {monthlyFee?.cliente.nome}
                </strong>
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Esta ação não pode ser desfeita. Tem certeza de que deseja
                prosseguir?
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="button"
                className="flex w-full lg:w-50 justify-center rounded p-3"
                danger
                onClick={handleCancel}
              >
                Sim
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormCancelMonthlyFee;
