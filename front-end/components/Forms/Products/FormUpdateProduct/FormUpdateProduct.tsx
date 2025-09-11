import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import { useUpdateProduct } from "@/hooks/queries/products/useUpdateProduct";
import useAlert from "@/hooks/useAlert";
import { updateProductSchema } from "@/schemas/productSchemas";
import { Product, UpdateProduct, UpdateProductInput } from "@/types/product";

type Props = {
  onClose: () => void;
  product: Product | undefined;
};

const FormUpdateProduct: React.FC<Props> = ({ onClose, product }) => {
  const alert = useAlert();

  const { handleSubmit, formState, control, register } =
    useForm<UpdateProductInput>({
      mode: "onBlur",
      resolver: zodResolver(updateProductSchema),
      defaultValues: product
        ? {
            id: product.id,
            nome: product.nome ?? "",
            valorCusto: product.valorCusto
              ? product.valorCusto.toFixed(2).replace(".", ",")
              : undefined,
            valorVenda: product.valorVenda
              ? product.valorVenda.toFixed(2).replace(".", ",")
              : undefined,
            descricao: product.descricao ?? "",
            estoque:
              product.estoque !== undefined && product.estoque !== null
                ? String(product.estoque)
                : undefined,
          }
        : undefined,
    });

  const { errors, isSubmitting } = formState;

  const { mutate } = useUpdateProduct({
    onSuccess: () => {
      alert("Produto atualizado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const transformData = (data: UpdateProductInput): UpdateProduct => {
    return {
      id: data.id,
      nome: data.nome ?? undefined,
      valorCusto: data.valorCusto
        ? parseFloat(data.valorCusto.replace(",", "."))
        : undefined,
      valorVenda: data.valorVenda
        ? parseFloat(data.valorVenda.replace(",", "."))
        : undefined,
      descricao: data.descricao ?? undefined,
      estoque: data.estoque ? parseInt(data.estoque, 10) : undefined,
    };
  };

  const handleSubmitData = (data: UpdateProductInput) => {
    mutate(transformData(data));
  };

  if (!product) {
    alert("Produto não encontrado.", "error");
    onClose();
    return null;
  }

  return (
    <DefaultFormatContainerForm title="Editar um Produto">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/2">
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    type="text"
                    label="Nome do Produto:"
                    placeholder="Digite o nome do produto"
                    error={errors.nome?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("descricao")}
                type="text"
                label="Descrição:"
                placeholder="Digite a descrição"
                error={errors.descricao?.message}
              />
            </div>
          </div>
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/3">
              <Controller
                name="valorCusto"
                control={control}
                render={({ field }) => (
                  <MoneyInput
                    {...field}
                    label="Valor de Custo unitário:"
                    externalValue={field.value}
                    placeholder="Digite o valor de custo"
                    error={errors.valorCusto?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Controller
                name="valorVenda"
                control={control}
                render={({ field }) => (
                  <MoneyInput
                    {...field}
                    label="Valor de Venda unitário:"
                    externalValue={field.value}
                    placeholder="Digite o valor de venda"
                    error={errors.valorVenda?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <Controller
                name="estoque"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Estoque:"
                    placeholder="Digite o estoque"
                    error={errors.estoque?.message}
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

export default FormUpdateProduct;
