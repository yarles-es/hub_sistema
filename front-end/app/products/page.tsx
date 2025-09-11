"use client";

import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import ModalCreateProduct from "@/components/Modals/ProductModals/ModalCreateProduct";
import ModalUpdateProduct from "@/components/Modals/ProductModals/ModalUpdateProduct";
import PageTransition from "@/components/PageTransition/PageTransition";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import ProductTable from "@/components/Tables/ProductTable";
import { useGetAllProducts } from "@/hooks/queries/products/useGetAllProducts";
import { ModalProdutType } from "@/types/ModalTypes";

const ProductPage = () => {
  const [modals, setModals] = useState<ModalProdutType>("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const { data: products, refetch, error } = useGetAllProducts();

  const objectVisualModals = {
    create: () => setModals("create"),
    edit: () => setModals("edit"),
    disable: () => setModals("disable"),
    sell: () => setModals("sell"),
    delete: () => setModals("delete"),
  };

  const onOpenModal = (id: number, type: ModalProdutType) => {
    if (!type) return;

    setItemSelected(id);
    objectVisualModals[type]();
  };

  const onCloseModal = (refetchCallback?: boolean) => {
    setModals("");
    setItemSelected(0);
    if (refetchCallback) refetch();
  };

  return (
    <PageTransition>
      <div>
        <Breadcrumb pageName="Produtos" />
        <HeaderTable viewHeader={true}>
          <>
            <Button header onClick={() => onOpenModal(0, "create")}>
              <p>Cadastrar</p>
            </Button>
          </>
        </HeaderTable>
      </div>
      <div className="flex flex-col gap-4">
        {products && products.length > 0 ? (
          <div className="mt-1.5 xl:mt-3">
            <PageTransition>
              <ProductTable
                products={products}
                onOpenItemSelect={onOpenModal}
              />
            </PageTransition>
          </div>
        ) : (
          <div className="w-full h-96 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum produto cadastrado.
            </p>
          </div>
        )}
      </div>

      {modals === "create" && (
        <ModalCreateProduct
          isOpen={modals === "create"}
          onClose={onCloseModal}
        />
      )}

      {modals === "edit" && itemSelected !== 0 && (
        <ModalUpdateProduct
          isOpen={modals === "edit"}
          onClose={onCloseModal}
          product={products?.find((item) => item.id === itemSelected)}
        />
      )}
    </PageTransition>
  );
};

export default ProductPage;
