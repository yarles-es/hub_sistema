import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import { PaymentType } from "@/types/Daily";
import { createFullUrlFromParamsBrowser } from "@/utils/generateURLpaginateOrFilter";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  idDaily: number;
  nomeCliente: string;
  initialDate: string;
  finalDate: string;
  formaPagamento: PaymentType[];
  observacao: string;
};

const FormSearchDaily: React.FC<Props> = ({ isOpen, onClose }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleSubmit, formState, control, register, watch } =
    useForm<FormValues>({
      defaultValues: {
        idDaily: 0,
        nomeCliente: "",
        initialDate: "",
        finalDate: "",
        formaPagamento: [
          PaymentType.DINHEIRO,
          PaymentType.PIX,
          PaymentType.CARTAO,
          PaymentType.GRATIS,
        ],
        observacao: "",
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
    <DefaultFormatContainerForm title="Consulta de diárias">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Input
                {...register("nomeCliente")}
                type="text"
                label="Nome do cliente:"
                placeholder="Digite o nome do cliente"
                error={errors.nomeCliente?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("observacao")}
                type="text"
                label="Observação:"
                placeholder="Digite a observação"
                error={errors.observacao?.message}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <Input
                {...register("initialDate")}
                type="date"
                label="Data inicial:"
                error={errors.initialDate?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("finalDate")}
                type="date"
                label="Data final:"
                error={errors.finalDate?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("finalDate")}
                type="date"
                label="Data final:"
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

export default FormSearchDaily;
