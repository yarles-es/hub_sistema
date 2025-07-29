import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { updateDaily } from "@/api/finance/daily.api";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import SelectTypePayment from "@/components/Selects/SelectTypePayment";
import useAlert from "@/hooks/useAlert";
import { updateDailySchema } from "@/schemas/dailySchemas";
import { Daily, PaymentType, UpdateDaily } from "@/types/Daily";

type Props = {
  onClose: () => void;
  daily: Daily | undefined;
};

const FormEditDaily: React.FC<Props> = ({ onClose, daily }) => {
  const alert = useAlert();

  const { register, handleSubmit, formState, control, reset } =
    useForm<UpdateDaily>({
      mode: "onBlur",
      resolver: zodResolver(updateDailySchema),
      defaultValues: {
        id: daily?.id || 0,
        nomeCliente: daily?.nomeCliente || undefined,
        valor: daily?.valor
          ? `R$:${daily.valor.toFixed(2).replace(".", ",")}`
          : undefined,
        formaPagamento: daily?.formaPagamento || PaymentType.DINHEIRO,
        observacao: daily?.observacao || null,
      },
    });

  useEffect(() => {
    if (daily) {
      reset({
        id: daily.id,
        nomeCliente: daily.nomeCliente ?? "",
        valor: daily.valor
          ? daily.valor.toFixed(2).replace(".", ",")
          : undefined,
        formaPagamento: daily.formaPagamento ?? PaymentType.DINHEIRO,
        observacao: daily.observacao ?? "",
      });
    }
  }, [daily, reset]);

  const { errors, isSubmitting } = formState;

  const { mutate } = useMutation({
    mutationFn: updateDaily,

    onSuccess: () => {
      alert("Diária editada com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: UpdateDaily) => {
    mutate(data);
  };

  if (!daily) {
    alert("Diária selecionada não encontrada", "error");
    onClose();
    return null;
  }

  return (
    <DefaultFormatContainerForm title="Editar diária">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Input
                {...register("nomeCliente")}
                type="text"
                label="Nome do cliente:"
                placeholder="Digite o nome do cliente"
                error={errors.nomeCliente?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("observacao")}
                type="text"
                label="Observação"
                placeholder="Digite a observação"
                error={errors.observacao?.message}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="valor"
                render={({ field }) => (
                  <MoneyInput
                    {...field}
                    externalValue={field.value}
                    label="Valor:"
                    error={errors.valor?.message}
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
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row"></div>
          <div className="flex justify-center items-center">
            <Button
              disabled={isSubmitting}
              type="submit"
              className={`flex w-full lg:w-100 justify-center p-3 rounded`}
              primary
            >
              Editar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormEditDaily;
