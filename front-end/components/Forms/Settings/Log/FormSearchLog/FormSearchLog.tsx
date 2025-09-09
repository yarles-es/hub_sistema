import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import InputGetClientByName from "@/components/Inputs/InputGetClientByName";
import SelectUser from "@/components/Selects/SelectUser";
import { createFullUrlFromParamsBrowser } from "@/utils/generateURLpaginateOrFilter";

type Props = {
  onClose: () => void;
};

type FormValues = {
  clienteId: number | undefined;
  usuarioId: number | undefined;
  initialDate: string;
  finalDate: string;
};

const FormSearchLog: React.FC<Props> = ({ onClose }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleSubmit, formState, control, register, setValue } =
    useForm<FormValues>({
      defaultValues: {
        clienteId: undefined,
        usuarioId: undefined,
        initialDate: "",
        finalDate: "",
      },
    });

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    if (data.clienteId === 0) data.clienteId = undefined;
    if (data.usuarioId === 0) data.usuarioId = undefined;

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
    <DefaultFormatContainerForm title="Consulta de Logs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full">
              <InputGetClientByName
                selectClient={(client) => {
                  setValue("clienteId", client ? client.id : undefined);
                }}
                errorInput={errors.clienteId}
              />
            </div>
          </div>
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/3">
              <Input
                {...register("initialDate")}
                type="date"
                label="Data inicial:"
                error={errors.initialDate?.message}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Input
                {...register("finalDate")}
                type="date"
                label="Data final:"
                error={errors.finalDate?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="usuarioId"
                render={({ field }) => (
                  <SelectUser
                    {...field}
                    value={field.value?.toString() || ""}
                    label="Usuário:"
                    error={errors.usuarioId?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              className={`flex w-full lg:w-100 justify-center p-3 rounded`}
              primary
            >
              Consultar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormSearchLog;
