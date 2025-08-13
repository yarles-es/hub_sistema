import { genericRequest } from "../@genericRequest";

import {
  RegisterTurnstile,
  startLinkWithTurnstileInput,
} from "@/types/Turnstile";

export const getAvailableId = async () => {
  return await genericRequest<{ id: number }>("get", "catraca/id-disponivel");
};

export const startLinkWithTurnstile = async (
  data: startLinkWithTurnstileInput
) => {
  return await genericRequest<RegisterTurnstile>(
    "post",
    "catraca/iniciar-cadastro",
    data
  );
};

export const cancelTurnstileOperation = async () => {
  return await genericRequest<void>("post", "catraca/cancelar-operacao");
};

export const getFirstRegisterTurnstile = async () => {
  return await genericRequest<RegisterTurnstile>(
    "get",
    "catraca/cadastro-biometria"
  );
};

export const cleanTemplateById = async (id: number) => {
  return await genericRequest<void>("delete", `catraca/limpar-template/${id}`);
};

export const releaseTurnstileEntry = async () => {
  return await genericRequest<void>("post", `catraca/liberar-entrada`);
};

export const releaseTurnstileExit = async () => {
  return await genericRequest<void>("post", `catraca/liberar-saida`);
};

export const freeTurnstile = async () => {
  return await genericRequest<void>("post", `catraca/liberar-entrada-saida`);
};
