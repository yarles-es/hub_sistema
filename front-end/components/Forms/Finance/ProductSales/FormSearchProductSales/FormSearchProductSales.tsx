import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import Button from "@/components/Buttons/Button";
import DefaultFormatContainerForm from "@/components/Forms/DefaultFormatContainerForm";
import Input from "@/components/Inputs/Input";
import InputGetProductByName from "@/components/Inputs/InputGetProductByName";
import { createFullUrlFromParamsBrowser } from "@/utils/generateURLpaginateOrFilter";

type Props = {
  onClose: () => void;
};

type FormValues = {
  initialDate: string;
  finalDate: string;
  productId: number | undefined;
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
