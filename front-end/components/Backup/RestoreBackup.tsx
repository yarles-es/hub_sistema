"use client";

import { useRef, useState } from "react";

import Button from "../Buttons/Button";
import Input from "../Inputs/Input";

import { restoreBackup } from "@/api/backup/backup.api";
import useAlert from "@/hooks/useAlert";

const RestoreBackup = () => {
  const alert = useAlert();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  const resetInput = () => {
    setFile(null);
    setFileInputKey((k) => k + 1);
  };

  const handleRestore = async () => {
    if (!file) {
      alert("Selecione um arquivo .sql ou .sql.gz", "warning");
      return;
    }

    const name = file.name.toLowerCase();
    if (!(name.endsWith(".sql") || name.endsWith(".sql.gz"))) {
      alert("Envie um arquivo .sql ou .sql.gz", "warning");
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await restoreBackup(file, controller.signal);
      if (res.ok) {
        alert("Restauração concluída com sucesso!", "success");
      } else {
        alert(res.error ?? "Falha ao restaurar backup", "error");
      }
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? "Erro ao restaurar backup", "error");
    } finally {
      setLoading(false);
      abortRef.current = null;
      resetInput();
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto h-[calc(100dvh-175px)] md:h-[calc(100vh-130px)] overscroll-none">
      <p className="m-5 text-center text-base font-bold text-black dark:text-white">
        Restaurar Backup
      </p>
      <div className="mt-1.5 xl:mt-3">
        <div className="m-2">
          <Input
            key={fileInputKey}
            type="file"
            accept=".sql,.gz"
            onChange={onPick}
            className="block w-full cursor-pointer rounded border border-stroke bg-white p-2 text-xs 
             dark:border-strokedark dark:bg-boxdark 
             text-center file:mr-4 file:rounded-md file:border-0 
             file:bg-primary file:px-3 file:py-1 file:text-white file:text-xs file:cursor-pointer"
          />
          {file && (
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-300">
              Selecionado: <span className="font-medium">{file.name}</span>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center m-2">
          <Button
            className="flex w-full lg:w-100 justify-center rounded p-3"
            primary
            onClick={handleRestore}
            disabled={loading || !file}
          >
            {loading ? "Restaurando..." : "Enviar e restaurar backup"}
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
              <span>Enviando backup... Aguarde!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestoreBackup;
