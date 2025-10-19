"use client";

import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SearchRegistryAccessModal from "@/components/Modals/RegistryAccessModals/SearchRegistryAccessModal";
import PageTransition from "@/components/PageTransition/PageTransition";
import AccessRegistrationTable from "@/components/Tables/AccessRegistrationTable";
import TurnstileController from "@/components/TurnstileController/TurnstileController";
import { useAccessRegistrationsForDay } from "@/hooks/useAccessRegistrationsForDay";

export default function Home() {
  const [searchRegisters, setSearchRegisters] = useState(false);

  const { items } = useAccessRegistrationsForDay();

  return (
    <PageTransition>
      {/* esse container controla toda a rolagem */}
      <div className="h-[100dvh] overflow-y-auto">
        <Breadcrumb pageName="Início" init />

        <div className="flex flex-col xl:flex-row gap-4">
          <TurnstileController init />

          <div className="xl:w-1/2 rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs">
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
}
