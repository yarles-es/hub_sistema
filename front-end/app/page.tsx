"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageTransition from "@/components/PageTransition/PageTransition";
import AccessRegistrationTable from "@/components/Tables/AccessRegistrationTable";
import TurnstileController from "@/components/TurnstileController/TurnstileController";

export default function Home() {
  return (
    <PageTransition>
      {/* esse container controla toda a rolagem */}
      <div className="h-[100dvh] overflow-y-auto">
        <Breadcrumb pageName="Início" init />

        <div className="flex flex-col xl:flex-row gap-4">
          <TurnstileController init />

          <div className="xl:w-1/2 rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs">
            <div className="mt-1.5 xl:mt-3">
              <AccessRegistrationTable />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
