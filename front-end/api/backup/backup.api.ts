import { AxiosResponse } from "axios";

import { genericRequest } from "../@genericRequest";

const getFilenameFromDisposition = (disposition?: string | null) => {
  if (!disposition) return `backup_${Date.now()}.sql.gz`;
  const match = /filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i.exec(
    disposition
  );
  return match?.[1] ?? `backup_${Date.now()}.sql.gz`;
};

export async function downloadBackup(signal?: AbortSignal) {
  const res = (await genericRequest<Blob>("post", "/backup/download", {
    responseType: "blob",
    returnFullResponse: true,
    signal,
  })) as AxiosResponse<Blob>;

  const filename = getFilenameFromDisposition(
    res.headers["content-disposition"]
  );
  const blob = new Blob([res.data], {
    type: res.headers["content-type"] ?? "application/gzip",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function restoreBackup(file: File, signal?: AbortSignal) {
  const name = file.name.toLowerCase();
  if (!(name.endsWith(".sql") || name.endsWith(".sql.gz"))) {
    throw new Error("Envie um arquivo .sql ou .sql.gz");
  }

  const form = new FormData();
  form.append("file", file);
  const response = (await genericRequest<any>("post", "/backup/restore", {
    body: form,
    signal,
    returnFullResponse: true,
  })) as AxiosResponse<any>;

  return response.data as {
    ok: boolean;
    restoredFrom?: string;
    error?: string;
  };
}
