import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import { useCreateProduct } from "@/hooks/queries/products/useCreateProduct";
import useAlert from "@/hooks/useAlert";
import { createProductSchema } from "@/schemas/productSchemas";
import { CreateProduct, CreateProductInput } from "@/types/product";

type Props = {
  onClose: () => void;
};

const FormCreateProduct: React.FC<Props> = ({ onClose }) => {
  const { register, handleSubmit, formState, control } =
    useForm<CreateProductInput>({
      mode: "onBlur",
      resolver: zodResolver(createProductSchema),
      defaultValues: {
        nome: "",
        descricao: "",
        estoque: "",
        valorCusto: "",
        valorVenda: "",
        ativo: true,
      },
    });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useCreateProduct({
    onSuccess: () => {
      alert("Produto criado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const transformProductData = (data: CreateProductInput): CreateProduct => {
    return {
      nome: data.nome,
      descricao: data.descricao !== "" ? data.descricao : undefined,
      valorVenda: parseFloat(data.valorVenda.replace(/,/g, ".")),
      valorCusto: parseFloat(data.valorCusto.replace(/,/g, ".")),
      estoque: parseInt(data.estoque, 10),
      ativo: true,
    };
  };

  const handleSubmitData = (data: CreateProductInput) => {
    mutate(transformProductData(data));
  };

  return (
    <DefaultFormatContainerForm title="Novo Produto">
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
                    label="Nome do produto:"
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
                    label="Valor de custo unitário:"
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
                    label="Valor de venda unitário:"
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
              Criar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormCreateProduct;
