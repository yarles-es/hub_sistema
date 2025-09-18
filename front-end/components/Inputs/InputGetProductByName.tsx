import React, { useEffect, useMemo, useState } from "react";

import { FieldError } from "react-hook-form";

import DefaultFormTableContainer from "../FormTables/DefaultFormTableContainer";

import Input from "./Input";

import { useGetAllProducts } from "@/hooks/queries/products/useGetAllProducts";
import useOrderTable from "@/hooks/useOrderTable";
import { Product } from "@/types/product";
import { Title } from "@/types/Tables";
import { isNotNull } from "@/utils/tableGuardType";

type Props = {
  selectProduct: (product: Product | null) => void;
  errorInput?: FieldError | undefined;
};

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .trim();

const InputGetProductByName: React.FC<Props> = ({
  selectProduct,
  errorInput,
}) => {
  const [productName, setProductName] = useState<string>("");
  const [productSelected, setProductSelected] = useState<Product | null>(null);

  const titles: Array<Title | null> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "nome", label: "Nome", type: "string", order: true },
    { key: "descricao", label: "Descrição", type: "string", order: true },
    { key: "valorVenda", label: "Preço de venda", type: "number", order: true },
    { key: "estoque", label: "Estoque", type: "number", order: true },
    { key: "ativo", label: "Status", type: "boolean", order: true },
  ];

  const { data: products = [], error } = useGetAllProducts();
  const titlesFiltered = titles.filter(isNotNull);

  const filteredProducts = useMemo(() => {
    if (!productName) return products;
    const q = normalize(productName);
    return products.filter((p) => {
      const nome = normalize(String(p.nome ?? ""));
      const descricao = normalize(String(p.descricao ?? ""));
      return nome.includes(q) || descricao.includes(q);
    });
  }, [products, productName]);

  const { dataOrder: itemsOrder, handleOrder } = useOrderTable({
    data: filteredProducts,
    titles: titlesFiltered,
  });

  const handleOrderClick = (title: Title) => {
    if (!title.order) return;
    return () => handleOrder(title.key);
  };

  const handleSelectProduct = (product: Product) => {
    if (productSelected?.id === product.id) {
      setProductSelected(null);
      selectProduct(null);
    } else {
      setProductSelected(product);
      selectProduct(product);
    }
  };

  const handleFilterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  useEffect(() => {
    if (
      productSelected &&
      !filteredProducts.some((p) => p.id === productSelected.id)
    ) {
      setProductSelected(null);
      selectProduct(null);
    }
  }, [filteredProducts, productSelected, selectProduct]);

  return (
    <div>
      <div className="w-full lg:w-3/4 lg:mx-auto mt-4">
        <Input
          name="productName"
          type="text"
          placeholder="Digite o nome ou descrição do produto"
          value={productName}
          onChange={handleFilterProducts}
          className="text-center"
          error={errorInput?.message}
          errorClassName="text-center"
        />
      </div>

      <DefaultFormTableContainer maxH="h-60">
        <thead className="bg-gray-50 top-0 sticky z-1">
          <tr className="bg-gray-3 text-left text-sx dark:bg-meta-4">
            {titlesFiltered.map((title, key) =>
              key === 0 ? (
                <th
                  onClick={handleOrderClick(title)}
                  id={title.key as string}
                  key={key}
                  className={`py-4 px-4 font-medium text-black dark:text-white xl:pl-11 ${
                    title.order ? "cursor-pointer" : ""
                  }`}
                >
                  {title.label}
                </th>
              ) : (
                <th
                  onClick={handleOrderClick(title)}
                  id={title.key as string}
                  key={key}
                  className={`py-4 px-4 font-medium text-black dark:text-white ${
                    title.order ? "cursor-pointer" : ""
                  }`}
                >
                  {title.label}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {itemsOrder.length === 0 ? (
            <tr>
              <td
                className="py-6 px-4 text-center text-black dark:text-white"
                colSpan={titlesFiltered.length}
              >
                Nenhum produto encontrado.
              </td>
            </tr>
          ) : (
            itemsOrder.map((item, key) => (
              <tr
                key={key}
                onClick={() => handleSelectProduct(item)}
                className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-meta-4 ${
                  productSelected?.id === item.id ? "bg-meta-4" : ""
                }`}
              >
                <td className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  {item.id}
                </td>
                <td className="py-4 px-4 font-medium text-black dark:text-white max-w-[200px]">
                  {String(item.nome ?? "").toUpperCase()}
                </td>
                <td className="py-4 px-4 text-black dark:text-white max-w-[200px]">
                  <p>{item.descricao}</p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <p className={`text-success`}>
                    {Number(item.valorVenda ?? 0).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <p>{item.estoque}</p>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
                      item.ativo
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {item.ativo ? "Ativo" : "Inativo"}
                  </p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </DefaultFormTableContainer>

      <div className="text-green-500 text-center mt-4 h-5 mb-4">
        <p>Produto Selecionado:</p>
        <p>
          <strong className="text-success">
            {productSelected &&
              String(productSelected.nome ?? "").toUpperCase()}
          </strong>
        </p>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>Erro ao buscar produtos: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default InputGetProductByName;
