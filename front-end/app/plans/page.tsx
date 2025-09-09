"use client";

import { useEffect, useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Buttons/Button";
import ModalCreatePlan from "@/components/Modals/PlanModals/ModalCreatePlan";
import ModalEditPlan from "@/components/Modals/PlanModals/ModalEditPlan";
import PageTransition from "@/components/PageTransition/PageTransition";
import HeaderTable from "@/components/Tables/HeaderTable/HeaderTable";
import PlanTable from "@/components/Tables/PlanTable";
import usePlan from "@/hooks/queries/usePlan";
import useAlert from "@/hooks/useAlert";
import { ModalPlanType } from "@/types/ModalTypes";

const PlanPage = () => {
  const alert = useAlert();

  const [modals, setModals] = useState("");
  const [itemSelected, setItemSelected] = useState<number>(0);

  const { data: plans, refetch, error } = usePlan();

  useEffect(() => {
    if (error) alert(error.message, "error");

    return () => setModals("");
  }, [error, alert]);

  const objectVisualModals = {
    create: () => setModals("create"),
    edit: () => setModals("edit"),
    disable: () => setModals("disable"),
    active: () => setModals("active"),
  };

  const onOpenModal = (id: number, type: ModalPlanType) => {
    if (!type) return;

    setItemSelected(id);
    objectVisualModals[type]();
  };

  return (
    <PageTransition>
      <div>
        <Breadcrumb pageName="Planos" />
        <HeaderTable viewHeader={true}>
          <>
            <Button header onClick={() => onOpenModal(0, "create")}>
              <p>Criar</p>
            </Button>
          </>
        </HeaderTable>
      </div>
      <div className="flex flex-col gap-4">
        {plans && plans.length > 0 ? (
          <div className="mt-1.5 xl:mt-3">
            <PageTransition>
              <PlanTable plans={plans} onOpenItemSelect={onOpenModal} />
            </PageTransition>
          </div>
        ) : null}

        {modals === "create" && (
          <ModalCreatePlan
            isOpen={modals === "create"}
            onClose={() => setModals("")}
            onCloseAndGetPlans={() => {
              setModals("");
              refetch();
            }}
          />
        )}
        {modals === "edit" && (
          <ModalEditPlan
            isOpen={modals === "edit"}
            onClose={() => setModals("")}
            onCloseAndGetPlan={() => {
              setModals("");
              refetch();
            }}
            plan={plans?.find((plan) => plan.id === itemSelected)}
          />
        )}
        {modals === "disable" && (
          <p>Modal de desativação para o plano {itemSelected}</p>
        )}
        {modals === "active" && (
          <p>Modal de ativação para o plano {itemSelected}</p>
        )}
      </div>
    </PageTransition>
  );
};

export default PlanPage;
