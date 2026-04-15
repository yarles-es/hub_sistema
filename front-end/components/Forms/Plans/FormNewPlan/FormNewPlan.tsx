import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import SelectTypePlano from "@/components/Selects/SelectTypePlano";
import { useCreatePlan } from "@/hooks/queries/plans/useCreatePlan";
import useAlert from "@/hooks/useAlert";
import { createPlanSchema } from "@/schemas/planSchemas";
import { CreatePlano, MAX_DIAS_VALIDOS_SEMANA } from "@/types/Plano";

type FormNewUserProps = {
  onClose: () => void;
};

const FormNewPlan: React.FC<FormNewUserProps> = ({ onClose }) => {
  const { register, handleSubmit, formState, control, watch } =
    useForm<CreatePlano>({
      mode: "onBlur",
      resolver: zodResolver(createPlanSchema),
      defaultValues: {
        nome: "",
        valor: "",
        descricao: "",
        tipo: "",
        validarDiasSemana: false,
        diasValidosSemana: null,
      },
    });

  const { errors, isSubmitting } = formState;
  const validarDiasSemana = watch("validarDiasSemana");

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
            <div className="w-full xl:w-1/2">
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
                    label="Nome do plano:"
                    placeholder="Digite o nome do plano"
                    error={errors.nome?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("descricao")}
                type="text"
                label="Descrição:"
                placeholder="Digite a descrição"
                error={errors.descricao?.message}
              />
            </div>
          </div>
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/2">
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
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="tipo"
                render={({ field }) => (
                  <SelectTypePlano
                    firstOption={false}
                    {...field}
                    value={field.value?.toString() || ""}
                    label="Tipo:"
                    error={errors.tipo?.message}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
              <div className="w-full xl:flex-1 xl:max-w-[calc(100%-240px)]">
                <Controller
                  control={control}
                  name="validarDiasSemana"
                  render={({ field }) => (
                    <CheckBox
                      id="validarDiasSemana-create-plan"
                      checked={field.value ?? false}
                      onChange={(e) => field.onChange(e.target.checked)}
                    >
                      <span className="text-black dark:text-white">
                        Validar limite de dias por semana
                      </span>
                    </CheckBox>
                  )}
                />

                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Quando ativo, o sistema exige um limite entre 1 e{" "}
                  {MAX_DIAS_VALIDOS_SEMANA} dias por semana. Domingos ficam
                  livres dessa contagem.
                </p>
              </div>

              <div className="w-full xl:ml-auto xl:w-[224px] xl:flex-none">
                <Controller
                  control={control}
                  name="diasValidosSemana"
                  render={({ field }) => (
                    <div
                      className={`transition-opacity duration-150 ${
                        validarDiasSemana
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className="flex min-h-[44px] items-center justify-end gap-3 whitespace-nowrap">
                        <label
                          htmlFor="diasValidosSemana-create-plan"
                          className="text-xs font-medium text-black dark:text-white"
                        >
                          Dias válidos:
                        </label>
                        <input
                          id="diasValidosSemana-create-plan"
                          value={field.value?.toString() ?? ""}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            field.onChange(value === "" ? null : Number(value));
                          }}
                          type="text"
                          inputMode="numeric"
                          disabled={!validarDiasSemana}
                          placeholder="1 a 6"
                          className="w-[72px] rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-center font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <p
                        className={`mt-1 min-h-[16px] text-right text-xs text-meta-7 ${
                          errors.diasValidosSemana?.message
                            ? "visible"
                            : "invisible"
                        }`}
                      >
                        {errors.diasValidosSemana?.message || "erro"}
                      </p>
                    </div>
                  )}
                />
              </div>
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
