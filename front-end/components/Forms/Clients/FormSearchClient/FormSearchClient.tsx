import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import InputPhone from "@/components/Inputs/InputPhone";
import SelectPlano from "@/components/Selects/SelectPlano";
import SelectStatusClient from "@/components/Selects/SelectStatusClient";
import { StatusClient, StatusClientEnum } from "@/types/Client";
import { createFullUrlFromParamsBrowser } from "@/utils/generateURLpaginateOrFilter";

type Props = {
  onClose: () => void;
};

type FormValues = {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  status: StatusClientEnum | undefined;
  planoId: number | undefined;
};

const FormSearchClient: React.FC<Props> = ({ onClose }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleSubmit, formState, control, register } = useForm<FormValues>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      status: undefined,
      planoId: undefined,
    },
  });

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const URL = createFullUrlFromParamsBrowser({
      params: data,
      pathName,
      searchParams,
    });

    const lastURL = `${pathName}?${searchParams.toString()}`;
    if (URL !== lastURL) {
      router.push(URL);
      onClose();
      return;
    }

    onClose();
  };

  return (
    <DefaultFormatContainerForm title="Consultar Cliente">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
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
            <div className="w-full xl:w-1/3">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <SelectStatusClient
                    {...field}
                    value={(field.value ?? "") as StatusClientEnum | ""}
                    label="Status:"
                    error={errors.status?.message}
                    onChange={(e) =>
                      field.onChange(e.target.value as StatusClient)
                    }
                  />
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
              type="submit"
              primary
              className="flex w-full lg:w-100 justify-center rounded p-3"
            >
              Consultar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormSearchClient;
