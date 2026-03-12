import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import DefaultFormatContainerForm from "@/components/Forms/DefaultFormatContainerForm";
import Input from "@/components/Inputs/Input";
import InputGetProductByName from "@/components/Inputs/InputGetProductByName";
import { PaymentType } from "@/types/Daily";
import { createFullUrlFromParamsBrowser } from "@/utils/generateURLpaginateOrFilter";

type Props = {
  onClose: () => void;
};

type FormValues = {
  initialDate: string;
  finalDate: string;
  productId: number | undefined;
  formaPagamento: PaymentType[];
};

const FormSearchProductSales = ({ onClose }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleSubmit, formState, control, register, setValue } =
    useForm<FormValues>({
      defaultValues: {
        initialDate: "",
        finalDate: "",
        productId: undefined,
        formaPagamento: [],
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
    <DefaultFormatContainerForm title="Consultar Venda de Produto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full">
              <InputGetProductByName
                selectProduct={(product) => {
                  setValue("productId", product ? product.id : undefined);
                }}
                errorInput={errors.productId}
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
                label="Data vencimento final:"
                placeholder="Digite a data de vencimento final"
                error={errors.finalDate?.message}
              />
            </div>
          </div>
          <span className="mb-2.5 flex items-center justify-center text-black dark:text-white">
            Forma de pagamento:
          </span>
          <div className="mb-6.5 flex flex-col items-center justify-center gap-6 xl:flex-row">
            <div className="flex flex-col items-start justify-normal gap-4 xl:flex-row xl:items-center">
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

export default FormSearchProductSales;
