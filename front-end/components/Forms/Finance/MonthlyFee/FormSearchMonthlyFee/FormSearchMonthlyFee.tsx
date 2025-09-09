import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import InputGetClientByName from "@/components/Inputs/InputGetClientByName";
import { PaymentType } from "@/types/Daily";
import { MonthlyFeeStatus } from "@/types/MonthlyFee";
import { createFullUrlFromParamsBrowser } from "@/utils/generateURLpaginateOrFilter";

type Props = {
  onClose: () => void;
};

type FormValues = {
  initialDate: string;
  finalDate: string;
  clientId: number | undefined;
  formaPagamento: PaymentType[];
  status: MonthlyFeeStatus[];
};

const FormSearchMonthlyFee = ({ onClose }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleSubmit, formState, control, register, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        initialDate: "",
        finalDate: "",
        clientId: undefined,
        formaPagamento: [],
        status: [],
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
                label="Data vencimento Inicial:"
                placeholder="Digite a data de vencimento inicial"
                error={errors.initialDate?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("finalDate")}
                type="date"
                label="Data vencimento Final:"
                placeholder="Digite a data de vencimento final"
                error={errors.finalDate?.message}
              />
            </div>
          </div>
          <span className="mb-2.5 text-black dark:text-white flex items-center justify-center">
            Forma de pagamento:
          </span>
          <div className="mb-6.5 flex flex-col gap-6 xl:flex-row justify-center items-center">
            <div className="flex flex-col xl:flex-row justify-normal items-start xl:items-center gap-4">
              {Object.values(PaymentType).map((status) => (
                <Controller
                  key={status}
                  control={control}
                  name="formaPagamento"
                  render={({ field }) => (
                    <CheckBox
                      id={status}
                      checked={field.value.includes(status)}
                      onChange={(e) => {
                        const newStatus = e.target.checked
                          ? [...field.value, status]
                          : field.value.filter((s) => s !== status);
                        field.onChange(newStatus);
                      }}
                    >
                      <p>{status}</p>
                    </CheckBox>
                  )}
                />
              ))}
            </div>
          </div>

          <span className="mb-2.5 text-black dark:text-white flex items-center justify-center">
            Status:
          </span>
          <div className="mb-6.5 flex flex-col gap-6 xl:flex-row justify-center items-center">
            <div className="flex flex-col xl:flex-row justify-normal items-start xl:items-center gap-4">
              {Object.values(MonthlyFeeStatus)
                .filter((status) => status !== MonthlyFeeStatus.ATRASADO)
                .map((status) => (
                  <Controller
                    key={status}
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <CheckBox
                        id={status}
                        checked={field.value.includes(status)}
                        onChange={(e) => {
                          const newStatus = e.target.checked
                            ? [...field.value, status]
                            : field.value.filter((s) => s !== status);
                          field.onChange(newStatus);
                        }}
                      >
                        <p>{status}</p>
                      </CheckBox>
                    )}
                  />
                ))}
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

export default FormSearchMonthlyFee;
