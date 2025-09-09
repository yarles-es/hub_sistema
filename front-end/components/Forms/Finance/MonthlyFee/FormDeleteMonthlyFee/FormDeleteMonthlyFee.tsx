import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import { useDeleteMonthlyFee } from "@/hooks/queries/monthlyFees/useDeleteMonthlyFee";
import { useMonthlyFeeById } from "@/hooks/queries/monthlyFees/useMonthlyFeeById";
import useAlert from "@/hooks/useAlert";

type Props = {
  onClose: () => void;
  monthlyFeeId: number;
};

const FormDeleteMonthlyFee: React.FC<Props> = ({ onClose, monthlyFeeId }) => {
  const alert = useAlert();

  const { data: monthlyFee } = useMonthlyFeeById(monthlyFeeId);

  const { mutate: deleteMonthlyFee } = useDeleteMonthlyFee({
    onSuccess: () => {
      alert("Mensalidade deletada com sucesso!", "success");
      onClose();
    },
    onError: (error: any) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (monthlyFee) deleteMonthlyFee(monthlyFee.id);
  };

  return (
    <DefaultFormatContainerForm title="Excluir Mensalidade">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full flex flex-col justify-center items-center text-center">
              <h1 className="mb-4">
                <strong className="text-meta-1 text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a excluir a mensalidade vinculada ao cliente:{" "}
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
                onClick={handleDelete}
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

export default FormDeleteMonthlyFee;
