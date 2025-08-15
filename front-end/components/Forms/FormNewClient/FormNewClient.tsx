import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { createClient } from "@/api/client/client.api";
import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import InputPhone from "@/components/Inputs/InputPhone";
import SelectPlano from "@/components/Selects/SelectPlano";
import useAlert from "@/hooks/useAlert";
import { createClientSchema } from "@/schemas/clientSchemas";
import { CreateClient } from "@/types/Client";

type Props = {
  onClose: () => void;
};

const FormNewClient: React.FC<Props> = ({ onClose }) => {
  const { register, handleSubmit, formState, control, watch } =
    useForm<CreateClient>({
      mode: "onBlur",
      resolver: zodResolver(createClientSchema),
      defaultValues: {
        nome: "",
        email: "",
        telefone: "",
        dataNascimento: "",
        planoId: 0,
        diaMensalidade: undefined,
        isento: false,
      },
    });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useMutation({
    mutationFn: createClient,

    onSuccess: () => {
      alert("Cliente cadastrado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: CreateClient) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Novo Cliente">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <Input
                {...register("nome")}
                type="text"
                label="Nome do cliente:"
                placeholder="Digite o nome do cliente"
                error={errors.nome?.message}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Input
                {...register("email")}
                type="text"
                label="Email:"
                placeholder="Digite o email"
                error={errors.email?.message}
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
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  >
                    <span className="text-white">Isento</span>
                  </CheckBox>
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
              <Input
                {...register("dataNascimento")}
                type="date"
                label="Data de Nascimento:"
                placeholder="Digite a data de nascimento"
                error={errors.dataNascimento?.message}
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
              Criar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormNewClient;
