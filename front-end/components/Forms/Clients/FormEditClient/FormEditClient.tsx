import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import { updateClient } from "@/api/client/client.api";
import { cleanTemplateById } from "@/api/turnstile/turnstile.api";
import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import InputPhone from "@/components/Inputs/InputPhone";
import SelectPlano from "@/components/Selects/SelectPlano";
import useAlert from "@/hooks/useAlert";
import { Client, UpdateClient } from "@/types/Client";

type Props = {
  onClose: () => void;
  client: Client | undefined;
  refetch: () => void;
};

const FormEditClient: React.FC<Props> = ({ onClose, client, refetch }) => {
  const alert = useAlert();

  const { handleSubmit, formState, control, setValue } = useForm<UpdateClient>({
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
          diaMensalidade: client.diaMensalidade ?? undefined,
          idCatraca: client.catracaId ?? null,
          isento: client.isento ?? false,
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

  const handleCleanTemplate = () => {
    if (client?.catracaId) {
      cleanTemplateById(client.catracaId)
        .then(() => {
          setValue("idCatraca", null);
          refetch();
          alert("Template limpo com sucesso!", "success");
        })
        .catch((error) => {
          alert(error.message, "error");
          console.error(error);
        });
    }
  };

  return (
    <DefaultFormatContainerForm title="Editar cliente">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/3">
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
            <div className="w-full xl:w-1/3">
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
            <div className="w-full xl:w-1/4">
              <Controller
                control={control}
                name="diaMensalidade"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Dia da Mensalidade:"
                    placeholder="Digite o dia"
                    error={errors.diaMensalidade?.message}
                    min={1}
                    max={31}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (Number(value) >= 1 && Number(value) <= 31)
                      ) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/4 flex items-center justify-center mt-5">
              <Controller
                control={control}
                name="isento"
                render={({ field }) => (
                  <CheckBox
                    classLabel="mb-3"
                    id="isento"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  >
                    <span className="text-white">Isento</span>
                  </CheckBox>
                )}
              />
            </div>
          </div>

          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
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
          <div className="flex flex-col justify-center items-center mb-5">
            <Controller
              control={control}
              name="idCatraca"
              render={({ field }) => (
                <Input
                  {...field}
                  value={
                    field.value !== null && field.value !== undefined
                      ? field.value
                      : ""
                  }
                  label="ID Catraca:"
                  placeholder={field.value ? field.value.toString() : ""}
                  disabled
                  className="max-w-[80px] text-center"
                  error={errors.idCatraca?.message}
                />
              )}
            />
            <Button
              type="button"
              className={`flex w-full lg:w-30 justify-center p-1 rounded`}
              primary
              disabled={!client.catracaId}
              onClick={handleCleanTemplate}
            >
              Desvincular
            </Button>
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
