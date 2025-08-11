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
