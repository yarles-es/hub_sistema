import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { updateClient } from "@/api/client/client.api";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import InputPhone from "@/components/Inputs/InputPhone";
import SelectPlano from "@/components/Selects/SelectPlano";
import useAlert from "@/hooks/useAlert";
import { Client, UpdateClient } from "@/types/Client";

type Props = {
  onClose: () => void;
  client: Client | undefined;
};

const FormEditClient: React.FC<Props> = ({ onClose, client }) => {
  const alert = useAlert();

  const { handleSubmit, formState, control, watch } = useForm<UpdateClient>({
    mode: "onBlur",
    defaultValues: client
      ? {
          id: client.id,
          nome: client.nome ?? "",
          email: client.email ?? "",
          telefone: client.telefone ?? "",
          dataNascimento:
            new Date(client.dataNascimento).toISOString().split("T")[0] || "",
          planoId: client.planoId ?? undefined,
        }
      : undefined,
  });

  const { errors, isSubmitting } = formState;

  const { mutate } = useMutation({
    mutationFn: updateClient,

    onSuccess: () => {
      alert("Cliente editado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: UpdateClient) => {
    mutate(data);
  };

  if (!client) {
    alert("Cliente não encontrado", "error");
    onClose();
    return null;
  }

  return (
    <DefaultFormatContainerForm title="Editar cliente">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="nome"
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    label="Nome:"
                    placeholder="Digite o nome"
                    error={errors.nome?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email:"
                    placeholder="Digite o email"
                    error={errors.email?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="mb-4.5 flex gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <Controller
                control={control}
                name="telefone"
                render={({ field }) => (
                  <InputPhone
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D/g, ""))
                    }
                    label="Telefone:"
                    placeholder="(00) 00000-0000"
                    error={errors.telefone?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Controller
                control={control}
                name="dataNascimento"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Data de Nascimento:"
                    error={errors.dataNascimento?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Controller
                control={control}
                name="planoId"
                render={({ field }) => (
                  <SelectPlano
                    {...field}
                    value={field.value?.toString() || ""}
                    label="Plano:"
                    error={errors.planoId?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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

export default FormEditClient;
