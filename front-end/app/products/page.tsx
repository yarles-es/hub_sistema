"use client";

import { useEffect, useMemo, useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import PageTransition from "@/components/PageTransition/PageTransition";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";

type ModalProdutType = "create" | "edit" | "disable" | "";

const ProductPage = () => {
  const [modals, setModals] = useState<ModalProdutType>("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const objectVisualModals = {
    create: () => setModals("create"),
    edit: () => setModals("edit"),
    disable: () => setModals("disable"),
  };

  const onOpenModal = (id: number, type: ModalProdutType) => {
    if (!type) return;

    setItemSelected(id);
    objectVisualModals[type]();
  };

  const onCloseModal = (refetchCallback?: boolean) => {
    setModals("");
    setItemSelected(0);
    // if (refetchCallback) refetch();
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
      <div className="flex flex-col gap-4"></div>
    </PageTransition>
  );
};

export default ProductPage;
