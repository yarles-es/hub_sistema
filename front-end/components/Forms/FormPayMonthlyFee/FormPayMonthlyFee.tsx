import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { payMonthlyFee } from "@/api/monthlyFee/monthlyFee.api";
import Button from "@/components/Buttons/Button";
import MoneyInput from "@/components/Inputs/InputMoney";
import SelectTypePayment from "@/components/Selects/SelectTypePayment";
import useAlert from "@/hooks/useAlert";
import { PaymentType } from "@/types/Daily";
import { MonthlyFeeWithClient, PaymentMonthlyFee } from "@/types/MonthlyFee";

type Props = {
  onClose: () => void;
  monthlyFee: MonthlyFeeWithClient | undefined;
};

const FormPayMonthlyFee: React.FC<Props> = ({ onClose, monthlyFee }) => {
  const { handleSubmit, formState, control } = useForm<PaymentMonthlyFee>({
    mode: "onBlur",
    defaultValues: {
      id: monthlyFee?.id || 0,
      valorPago: "",
      formaPagamento: PaymentType.DINHEIRO,
    },
  });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useMutation({
    mutationFn: payMonthlyFee,
    onSuccess: () => {
      alert("Mensalidade paga com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: PaymentMonthlyFee) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Pagar Mensalidade">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="mb-4">
                <strong className="text-meta-3 text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a pagar a mensalidade do cliente:{" "}
                <strong className="text-meta-3 text-lg">
                  {monthlyFee?.cliente.nome || "desconhecido"}
                </strong>
                .
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Valor a ser pago:{" "}
                <strong className="text-meta-3 text-sm">
                  {monthlyFee?.valor.toFixed(2).replace(".", ",") || "0,00"}
                </strong>
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Vencimendo:{" "}
                <strong className="text-meta-3 text-sm">
                  {new Date(monthlyFee?.vencimento || "").toLocaleDateString(
                    "pt-BR"
                  )}
                </strong>
              </p>

              <p className="text-sm text-gray-400 mb-4">
                Lembre-se que essa ação irá ativar o cliente, e gerar uma nova
                mensalidade com o vencimento na data atual de hoje.
              </p>
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="valorPago"
                render={({ field }) => (
                  <MoneyInput
                    {...field}
                    externalValue={field.value}
                    label="Valor:"
                    error={errors.valorPago?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="formaPagamento"
                render={({ field }) => (
                  <SelectTypePayment
                    {...field}
                    value={field.value ?? PaymentType.DINHEIRO}
                    label="Forma de pagamento:"
                    error={errors.formaPagamento?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              disabled={isSubmitting}
              type="submit"
              className={`flex w-full lg:w-100 justify-center p-3 rounded`}
              primary
            >
              {isSubmitting ? "Processando..." : "Pagar"}
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormPayMonthlyFee;
