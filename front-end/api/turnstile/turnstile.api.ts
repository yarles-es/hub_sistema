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
    { body: data }
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

export const setFirstMessage = async (mensagem: string) => {
  return await genericRequest<void>("post", `catraca/setar-primeira-mensagem`, {
    body: { mensagem },
  });
};

export const setSecondMessage = async (mensagem: string) => {
  return await genericRequest<void>("post", `catraca/setar-segunda-mensagem`, {
    body: { mensagem },
  });
};

export const setMessageBloq = async (mensagem: string) => {
  return await genericRequest<void>("post", `catraca/setar-mensagem-bloqueio`, {
    body: { mensagem },
  });
};

export const setClockwiseDirection = async (sentidoHorario: boolean) => {
  return await genericRequest<void>("post", `catraca/setar-sentido-horario`, {
    body: { sentidoHorario },
  });
};

export const setBiometryFlowType = async (tipo: number) => {
  return await genericRequest<void>(
    "post",
    `catraca/setar-tipo-fluxo-biometria`,
    { body: { tipo } }
  );
};

export const setFlowControlType = async (tipo: number) => {
  return await genericRequest<void>(
    "post",
    `catraca/setar-tipo-controle-fluxo`,
    { body: { tipo } }
  );
};

export const setDurationInteraction = async (duracao: number) => {
  return await genericRequest<void>("post", `catraca/setar-duracao-interacao`, {
    body: { duracao },
  });
};

export const connectTurnstile = async () => {
  return await genericRequest<void>("post", `catraca/conectar`, {});
};

export const disconnectTurnstile = async () => {
  return await genericRequest<void>("post", `catraca/desconectar`, {});
};

export const getMessages = async () => {
  return await genericRequest<{
    primeiraMensagem: string;
    segundaMensagem: string;
  }>("get", `catraca/buscar-mensagens`, {});
};

export const getBiometryFlowType = async () => {
  return await genericRequest<{ tipo: number }>(
    "get",
    `catraca/buscar-tipo-fluxo-biometria`,
    {}
  );
};

export const getDurationInteraction = async () => {
  return await genericRequest<{ duracao: number }>(
    "get",
    `catraca/buscar-duracao-interacao`,
    {}
  );
};

export const restartTurnstile = async () => {
  return await genericRequest<void>("post", `catraca/reiniciar`, {});
};
