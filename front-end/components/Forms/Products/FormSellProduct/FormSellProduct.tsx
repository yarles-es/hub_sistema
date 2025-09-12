import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import MoneyInput from "@/components/Inputs/InputMoney";
import { useCreateSellProduct } from "@/hooks/queries/sellProducts/useCreateSellProduct";
import useAlert from "@/hooks/useAlert";
import { Product } from "@/types/product";
import { CreateSellProduct, CreateSellProductInput } from "@/types/SellProduct";

type Props = {
  onClose: () => void;
  product?: Product;
};

const FormSellProduct: React.FC<Props> = ({ onClose, product }) => {
  const { handleSubmit, formState, control } = useForm<CreateSellProductInput>({
    mode: "onBlur",
    defaultValues: {
      produtoId: product?.id,
      quantidade: "",
      valorVenda: "",
    },
  });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useCreateSellProduct({
    onSuccess: () => {
      alert("Venda realizada com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
    },
  });

  const transformProductData = (
    data: CreateSellProductInput
  ): CreateSellProduct => {
    return {
      produtoId: data.produtoId!,
      quantidade: Number(data.quantidade),
      valorVenda: parseFloat(data.valorVenda.replace(/,/g, ".")),
    };
  };

  const handleSubmitData = (data: CreateSellProductInput) => {
    mutate(transformProductData(data));
  };

  if (!product) return null;

  return (
    <DefaultFormatContainerForm title="Venda Produto">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col justify-center">
            <div className="w-full xl:w-1/3">
              {product && (
                <Input
                  value={product?.nome}
                  disabled
                  label="Nome do produto:"
                />
              )}
            </div>
            <div className="w-full xl:w-1/6">
              {product && (
                <MoneyInput
                  label="Valor de venda:"
                  externalValue={`R$ ${product?.valorVenda
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")}`}
                  disabled
                />
              )}
            </div>
            <div className="w-full xl:w-1/6">
              {product && (
                <Input
                  label="Estoque atual:"
                  type="number"
                  value={product?.estoque}
                  disabled
                />
              )}
            </div>
          </div>
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col justify-center">
            <div className="w-full xl:w-1/4">
              <Controller
                name="quantidade"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Quantidade:"
                    placeholder="Digite a quantidade"
                    error={errors.quantidade?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/4">
              <Controller
                name="valorVenda"
                control={control}
                render={({ field }) => (
                  <MoneyInput
                    {...field}
                    label="Valor total de venda:"
                    externalValue={field.value}
                    error={errors.valorVenda?.message}
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
              success
            >
              Vender
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormSellProduct;
