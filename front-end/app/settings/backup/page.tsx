"use client";

import DownloadBackup from "@/components/Backup/DownloadBackup";
import RestoreBackup from "@/components/Backup/RestoreBackup";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageTransition from "@/components/PageTransition/PageTransition";

const BackupPage = () => {
  return (
    <PageTransition>
      <div className="h-[100dvh] overflow-y-auto">
        <div>
          <Breadcrumb pageName="Painel de Backup" />
        </div>

        <div className="flex flex-col xl:flex-row gap-4">
          <DownloadBackup />
          <RestoreBackup />
        </div>
      </div>
    </PageTransition>
  );
};

export default BackupPage;
