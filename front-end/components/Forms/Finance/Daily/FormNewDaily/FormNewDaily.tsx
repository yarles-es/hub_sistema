import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import SelectTypePayment from "@/components/Selects/SelectTypePayment";
import useAlert from "@/hooks/useAlert";
import { useCreateDaily } from "@/hooks/useQuery/dailys/useCreateDaily";
import { createDailySchema } from "@/schemas/dailySchemas";
import { CreateDaily, PaymentType } from "@/types/Daily";

type Props = {
  onClose: () => void;
};

const FormNewDaily: React.FC<Props> = ({ onClose }) => {
  const { register, handleSubmit, formState, control, watch } =
    useForm<CreateDaily>({
      mode: "onBlur",
      resolver: zodResolver(createDailySchema),
      defaultValues: {
        nomeCliente: null,
        valor: "",
        formaPagamento: PaymentType.DINHEIRO,
        observacao: null,
      },
    });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useCreateDaily({
    onSuccess: () => {
      alert("Diária cadastrada com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleSubmitData = (data: CreateDaily) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Nova diária">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
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
                    externalValue={watch("valor")}
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
              Criar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormNewDaily;
