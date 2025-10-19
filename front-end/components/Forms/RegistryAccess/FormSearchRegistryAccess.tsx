import { useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import InputGetClientByName from "@/components/Inputs/InputGetClientByName";
import AccessRegistrationTable from "@/components/Tables/AccessRegistrationTable";
import { useGetAllAccessRegistrations } from "@/hooks/queries/accessRegistrations/useAccessRegistrationsForFilter";

type FormValues = {
  initialDate: string;
  finalDate: string;
  clientId: number | undefined;
};

type Props = {
  onClose: () => void;
};

const FormSearchRegistryAccess = ({ onClose }: Props) => {
  const { handleSubmit, formState, register, setValue } = useForm<FormValues>({
    defaultValues: {
      initialDate: "",
      finalDate: "",
      clientId: undefined,
    },
  });

  const { errors } = formState;

  const { mutateAsync: getAccessRegistrations, data } =
    useGetAllAccessRegistrations();

  const onSubmit = (data: FormValues) => {
    getAccessRegistrations(data);
  };

  return (
    <DefaultFormatContainerForm title="Consultar Mensalidades">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full">
              <InputGetClientByName
                selectClient={(client) => {
                  setValue("clientId", client ? client.id : undefined);
                }}
                errorInput={errors.clientId}
              />
            </div>
          </div>
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/2">
              <Input
                {...register("initialDate")}
                type="date"
                label="Data Inicial:"
                placeholder="Digite a data inicial"
                error={errors.initialDate?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("finalDate")}
                type="date"
                label="Data final:"
                placeholder="Digite a data final"
                error={errors.finalDate?.message}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              primary
              className="flex w-full lg:w-50 justify-center rounded p-3"
            >
              Consultar
            </Button>
          </div>
        </div>
      </form>
      <AccessRegistrationTable items={data} />
    </DefaultFormatContainerForm>
  );
};

export default FormSearchRegistryAccess;
