import { useRef, useState } from "react";

import Button from "../Buttons/Button";

import { downloadBackup } from "@/api/backup/backup.api";
import useAlert from "@/hooks/useAlert";

const DownloadBackup = () => {
  const alert = useAlert();

  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await downloadBackup(controller.signal);
    } catch (e) {
      console.error(e);
      alert("Falha ao gerar/baixar backup", "error");
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto h-[calc(100dvh-175px)] md:h-[calc(100vh-130px)] overscroll-none">
      <p className="m-5 text-center text-base font-bold text-black dark:text-white">
        Download Backup
      </p>
      <div className="mt-1.5 xl:mt-3">
        <div className="flex justify-center items-center m-2">
          <Button
            className="flex w-full lg:w-100 justify-center rounded p-3"
            primary
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? "Gerando..." : "Gerar e baixar backup"}
          </Button>
        </div>

        <div className="flex justify-center items-center m-2">
          <Button
            className="flex w-full lg:w-100 justify-center rounded p-3"
            onClick={handleCancel}
            disabled={!loading}
            danger
          >
            Cancelar
          </Button>
        </div>

        {loading && (
          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-300 mb-2">
              <span>Baixando backup... Aguarde!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadBackup;
