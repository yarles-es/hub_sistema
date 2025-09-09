import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import { useCancelMonthlyFee } from "@/hooks/useQuery/monthlyFees/useCancelMonthlyFee";
import { useMonthlyFeeById } from "@/hooks/useQuery/monthlyFees/useMonthlyFeeById";
import useAlert from "@/hooks/useAlert";

type Props = {
  onClose: () => void;
  monthlyFeeId: number;
};

const FormCancelMonthlyFee: React.FC<Props> = ({ onClose, monthlyFeeId }) => {
  const alert = useAlert();

  const { data: monthlyFee } = useMonthlyFeeById(monthlyFeeId);

  const { mutate: cancelFee } = useCancelMonthlyFee({
    onSuccess: () => {
      alert("Mensalidade cancelada com sucesso!", "success");
      onClose();
    },
    onError: (error: any) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleCancel = () => {
    if (monthlyFee) cancelFee(monthlyFee.id);
  };

  return (
    <DefaultFormatContainerForm title="Cancelar Mensalidade">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full flex flex-col justify-center items-center text-center">
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
