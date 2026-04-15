import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import SelectTypePlano from "@/components/Selects/SelectTypePlano";
import { useUpdatePlan } from "@/hooks/queries/plans/useUpdatePlan";
import useAlert from "@/hooks/useAlert";
import { updatePlanSchema } from "@/schemas/planSchemas";
import {
  MAX_DIAS_VALIDOS_SEMANA,
  Plano,
  UpdatePlano,
} from "@/types/Plano";

type Props = {
  onClose: () => void;
  plan: Plano | undefined;
};

const FormEditPlan: React.FC<Props> = ({ onClose, plan }) => {
  const alert = useAlert();

  const { handleSubmit, formState, control, watch } = useForm<UpdatePlano>({
    mode: "onBlur",
    resolver: zodResolver(updatePlanSchema),
    defaultValues: plan
      ? {
          id: plan.id,
          nome: plan.nome ?? "",
          valor: plan.valor
            ? plan.valor.toFixed(2).replace(".", ",")
            : undefined,
          descricao: plan.descricao ?? "",
          tipo: plan.tipo ?? "",
          validarDiasSemana: plan.validarDiasSemana ?? false,
          diasValidosSemana: plan.diasValidosSemana ?? null,
        }
      : undefined,
  });

  const { errors, isSubmitting } = formState;
  const validarDiasSemana = watch("validarDiasSemana");

  const { mutate } = useUpdatePlan({
    onSuccess: () => {
      alert("Plano atualizado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleSubmitData = (data: UpdatePlano) => {
    mutate(data);
  };

  if (!plan) {
    alert("Plano não encontrado.", "error");
    onClose();
    return null;
  }

  return (
    <DefaultFormatContainerForm title="Editar Plano">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="mb-4">
                <strong className="text-primary text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a modificar o plano{" "}
                <strong className="text-primary text-lg">
                  {plan?.nome || "desconhecido"}
                </strong>
                .
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Lembre-se que, caso altere o valor do plano, essa ação irá
                modificar todas as mensalidades{" "}
                <strong className="text-warning text-sm">PENDENTE</strong> já
                existentes.
              </p>
            </div>
          </div>
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="nome"
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="text"
                    label="Nome do cliente:"
                    placeholder="Digite o nome do cliente"
                    error={errors.nome?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="descricao"
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="text"
                    label="Descrição:"
                    placeholder="Digite uma descrição"
                    error={errors.descricao?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
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
                      id="validarDiasSemana-edit-plan"
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
                          htmlFor="diasValidosSemana-edit-plan"
                          className="text-xs font-medium text-black dark:text-white"
                        >
                          Dias válidos:
                        </label>
                        <input
                          id="diasValidosSemana-edit-plan"
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
              Editar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormEditPlan;
