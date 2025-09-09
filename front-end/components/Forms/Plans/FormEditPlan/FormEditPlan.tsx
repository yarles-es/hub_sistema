import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import { updatePlan } from "@/api/plano/plano.api";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import useAlert from "@/hooks/useAlert";
import { updatePlanSchema } from "@/schemas/planSchemas";
import { Plano, UpdatePlano } from "@/types/Plano";

type Props = {
  onClose: () => void;
  plan: Plano | undefined;
};

const FormEditPlan: React.FC<Props> = ({ onClose, plan }) => {
  const alert = useAlert();

  const { handleSubmit, formState, control } = useForm<UpdatePlano>({
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
        }
      : undefined,
  });

  const { errors, isSubmitting } = formState;

  const { mutate } = useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      alert("Plano atualizado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: any) => {
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
            <div className="w-full xl:w-1/3">
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
            <div className="w-full xl:w-1/3">
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
            <div className="w-full xl:w-1/3">
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
