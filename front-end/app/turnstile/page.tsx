"use client";

import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SearchRegistryAccessModal from "@/components/Modals/RegistryAccessModals/SearchRegistryAccessModal";
import PageTransition from "@/components/PageTransition/PageTransition";
import AccessRegistrationTable from "@/components/Tables/AccessRegistrationTable";
import TurnstileController from "@/components/TurnstileController/TurnstileController";
import { useAccessRegistrationsForDay } from "@/hooks/useAccessRegistrationsForDay";

const TurnstilePanelPage = () => {
  const [searchRegisters, setSearchRegisters] = useState(false);

  const { items } = useAccessRegistrationsForDay();

  return (
    <PageTransition>
      <div className="h-[100dvh] overflow-y-auto">
        <div>
          <Breadcrumb pageName="Painel da Catraca" />
        </div>
        <div className="flex flex-col xl:flex-row gap-4">
          <TurnstileController />

          <div className="xl:w-1/2 rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto h-[calc(100dvh-175px)] md:h-[calc(100vh-130px)]  overscroll-none">
            <div className="mt-1.5 xl:mt-3">
              <AccessRegistrationTable
                viewModalSearch={() => setSearchRegisters(true)}
                items={items}
                enableActions
              />
            </div>
          </div>
        </div>
      </div>

      {searchRegisters && (
        <SearchRegistryAccessModal
          isOpen={searchRegisters}
          onClose={() => setSearchRegisters(false)}
        />
      )}
    </PageTransition>
  );
};

export default TurnstilePanelPage;
