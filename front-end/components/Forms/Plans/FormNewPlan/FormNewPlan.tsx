import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import { useCreatePlan } from "@/hooks/queries/plans/useCreatePlan";
import useAlert from "@/hooks/useAlert";
import { createPlanSchema } from "@/schemas/planSchemas";
import { CreatePlano } from "@/types/Plano";

type FormNewUserProps = {
  onClose: () => void;
};

const FormNewPlan: React.FC<FormNewUserProps> = ({ onClose }) => {
  const { register, handleSubmit, formState, control } = useForm<CreatePlano>({
    mode: "onBlur",
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      nome: "",
      valor: "",
      descricao: "",
    },
  });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useCreatePlan({
    onSuccess: () => {
      alert("Plano criado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleSubmitData = (data: CreatePlano) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Novo Plano">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/3">
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    type="text"
                    label="Nome do Plano:"
                    placeholder="Digite o nome do plano"
                    error={errors.nome?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Input
                {...register("descricao")}
                type="text"
                label="Descrição:"
                placeholder="Digite a descrição"
                error={errors.descricao?.message}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Controller
                name="valor"
                control={control}
                render={({ field }) => (
                  <MoneyInput
                    {...field}
                    label="Valor:"
                    externalValue={field.value}
                    placeholder="Digite o valor do plano"
                    error={errors.valor?.message}
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

export default FormNewPlan;
