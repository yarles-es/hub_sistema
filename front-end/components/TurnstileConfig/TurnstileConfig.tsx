import { use, useEffect } from "react";

import { useMutation, useQueries } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import Button from "../Buttons/Button";
import DefaultFormatContainerForm from "../Forms/DefaultFormatContainerForm";
import Input from "../Inputs/Input";

import {
  getDurationInteraction,
  getMessages,
  restartTurnstile,
  setBiometryFlowType,
  setClockwiseDirection,
  setDurationInteraction,
  setFirstMessage,
  setMessageBloq,
  setSecondMessage,
} from "@/api/turnstile/turnstile.api";
import useAlert from "@/hooks/useAlert";

const TurnstileConfig = () => {
  const alert = useAlert();

  const { reset, control, formState, watch } = useForm({
    defaultValues: {
      primeiraMensagem: "",
      segundaMensagem: "",
      duracaoInteracao: 0,
      mensagemBloqueio: "",
      tipoFluxoBiometria: "",
    },
  });

  const { errors } = formState;

  const [messages, duracaoInteracao] = useQueries({
    queries: [
      { queryKey: ["mensagens"], queryFn: () => getMessages(), retry: 0 },
      {
        queryKey: ["duracaoInteracao"],
        queryFn: () => getDurationInteraction(),
        retry: 0,
      },
    ],
  });

  useEffect(() => {
    if (messages.data) {
      reset((prev) => ({
        ...prev,
        primeiraMensagem: messages.data.primeiraMensagem,
        segundaMensagem: messages.data.segundaMensagem,
      }));
    }
    if (duracaoInteracao.data) {
      reset((prev) => ({
        ...prev,
        duracaoInteracao: duracaoInteracao.data.duracao,
      }));
    }
  }, [messages.data, duracaoInteracao.data, reset]);

  const formatStringData = (data: string) => {
    return data.slice(0, 16);
  };

  const { mutate: firstMessage } = useMutation({
    mutationFn: setFirstMessage,
    onSuccess: () => {
      alert("Primeira mensagem atualizada com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao atualizar a primeira mensagem.", "error");
    },
  });

  const { mutate: secondMessage } = useMutation({
    mutationFn: setSecondMessage,
    onSuccess: () => {
      alert("Segunda mensagem atualizada com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao atualizar a segunda mensagem.", "error");
    },
  });

  const { mutate: messageBloq } = useMutation({
    mutationFn: setMessageBloq,
    onSuccess: () => {
      alert("Mensagem de bloqueio atualizada com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao atualizar a mensagem de bloqueio.", "error");
    },
  });

  const { mutate: duracaoInteraction } = useMutation({
    mutationFn: setDurationInteraction,
    onSuccess: () => {
      alert("Duração de interação atualizada com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao atualizar a duração de interação.", "error");
    },
  });

  const { mutate: clockwiseDirection } = useMutation({
    mutationFn: setClockwiseDirection,
    onSuccess: () => {
      alert("Sentido horário atualizado com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao atualizar o sentido horário.", "error");
    },
  });

  const { mutate: biometryFlowType } = useMutation({
    mutationFn: setBiometryFlowType,
    onSuccess: () => {
      alert("Tipo de fluxo biométrico atualizado com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao atualizar o tipo de fluxo biométrico.", "error");
    },
  });

  const { mutate: restart } = useMutation({
    mutationFn: restartTurnstile,
    onSuccess: () => {
      alert("Catraca reiniciada com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao reiniciar a catraca.", "error");
    },
  });

  const handleSetFirstMessage = async (data: string) => {
    if (data.trim() === "") {
      alert("A primeira mensagem não pode estar vazia.", "error");
      return;
    }
    firstMessage(data);
  };

  const handleSetSecondMessage = async (data: string) => {
    if (data.trim() === "") {
      alert("A segunda mensagem não pode estar vazia.", "error");
      return;
    }
    secondMessage(data);
  };

  const handleSetBlockMessage = async (data: string) => {
    if (data.trim() === "") {
      alert("A mensagem de bloqueio não pode estar vazia.", "error");
      return;
    }
    messageBloq(data);
  };

  const handleSetDurationInteraction = async (data: number) => {
    if (data <= 0) {
      alert("A duração de interação deve ser um número positivo.", "error");
      return;
    }
    const valueMilliseconds = data * 1000;
    duracaoInteraction(valueMilliseconds);
  };

  const handleSetClockwiseDirection = async (data: boolean) => {
    clockwiseDirection(data);
  };

  const handleSetBiometryFlowType = async (data: string) => {
    if (isNaN(Number(data)) || (Number(data) !== 0 && Number(data) !== 1)) {
      alert("O tipo de fluxo biométrico deve ser 0 ou 1.", "error");
      return;
    }
    biometryFlowType(Number(data));
  };

  const handleRestartTurnstile = () => {
    restart();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto  overscroll-none">
      <DefaultFormatContainerForm title="Configuração de Catraca">
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
              <div className="w-full xl:w-1/4">
                <Controller
                  control={control}
                  name="primeiraMensagem"
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(formatStringData(e.target.value))
                      }
                      label="Primeira mensagem:"
                      placeholder="Mnsagem"
                      error={errors.primeiraMensagem?.message}
                    />
                  )}
                />
                <div className="flex justify-center items-center">
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    primary
                    onClick={() =>
                      handleSetFirstMessage(watch("primeiraMensagem"))
                    }
                  >
                    enviar
                  </Button>
                </div>
              </div>
              <div className="w-full xl:w-1/4">
                <Controller
                  control={control}
                  name="segundaMensagem"
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(formatStringData(e.target.value))
                      }
                      label="Segunda mensagem:"
                      placeholder="Mensagem"
                      error={errors.segundaMensagem?.message}
                    />
                  )}
                />
                <div className="flex justify-center items-center">
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    primary
                    onClick={() =>
                      handleSetSecondMessage(watch("segundaMensagem"))
                    }
                  >
                    enviar
                  </Button>
                </div>
              </div>
              <div className="w-full xl:w-1/4">
                <Controller
                  control={control}
                  name="mensagemBloqueio"
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(formatStringData(e.target.value))
                      }
                      label="Bloqueio:"
                      placeholder="Mensagem"
                      error={errors.mensagemBloqueio?.message}
                    />
                  )}
                />
                <div className="flex justify-center items-center">
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    primary
                    onClick={() =>
                      handleSetBlockMessage(watch("mensagemBloqueio"))
                    }
                  >
                    enviar
                  </Button>
                </div>
              </div>
              <div className="w-full xl:w-1/6">
                <Controller
                  control={control}
                  name="duracaoInteracao"
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          field.onChange("");
                        } else if (
                          !isNaN(Number(value)) &&
                          Number(value) >= 1 &&
                          Number(value) <= 20
                        ) {
                          field.onChange(Number(value));
                        }
                      }}
                      label="Duração:"
                      placeholder="duração"
                      error={errors.duracaoInteracao?.message}
                    />
                  )}
                />
                <div className="flex justify-center items-center">
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    primary
                    onClick={() =>
                      handleSetDurationInteraction(watch("duracaoInteracao"))
                    }
                  >
                    enviar
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-4.5 flex gap-6 xl:flex-row flex-col items-center justify-center">
              <div className="w-full flex flex-col justify-center items-center m-5">
                <p className={`mb-2.5 block text-black dark:text-white`}>
                  Sentido horário?
                </p>
                <div className="flex justify-center items-center gap-3">
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    success
                    onClick={() => handleSetClockwiseDirection(true)}
                  >
                    Sim
                  </Button>
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    danger
                    onClick={() => handleSetClockwiseDirection(false)}
                  >
                    Não
                  </Button>
                </div>
              </div>

              <div className="w-full flex flex-col justify-center items-center m-5">
                <p className={`mb-2.5 block text-black dark:text-white`}>
                  Reiniciar catraca:
                </p>
                <div className="flex justify-center items-center gap-3">
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    success
                    onClick={() => handleRestartTurnstile()}
                  >
                    reiniciar
                  </Button>
                </div>
              </div>

              {/* <div className="w-full flex flex-col justify-center items-center m-5">
                <p
                  className={`mb-2.5 block text-black dark:text-white text-sm`}
                >
                  Tipo biometria:
                </p>
                <p className={`mb-2.5 block text-black dark:text-white`}>
                  0 - biometria dependente de app
                </p>
                <p className={`mb-2.5 block text-black dark:text-white`}>
                  1 - biometria independente de app
                </p>
                <div className="flex justify-center items-center gap-1 flex-col">
                  <Controller
                    control={control}
                    name="tipoFluxoBiometria"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            field.onChange("");
                          } else if (value === "0" || value === "1") {
                            field.onChange(Number(value));
                          }
                        }}
                        value={field.value}
                        placeholder="1 ou 0"
                        error={errors.tipoFluxoBiometria?.message}
                        className="text-center"
                      />
                    )}
                  />
                  <Button
                    type="button"
                    className={`flex w-full lg:w-30 justify-center p-3 rounded`}
                    primary
                    onClick={() =>
                      handleSetBiometryFlowType(watch("tipoFluxoBiometria"))
                    }
                  >
                    enviar
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </form>
      </DefaultFormatContainerForm>
    </div>
  );
};

export default TurnstileConfig;
