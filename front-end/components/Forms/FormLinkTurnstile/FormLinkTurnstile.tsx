import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import {
  cancelTurnstileOperation,
  getAvailableId,
  getFirstRegisterTurnstile,
  startLinkWithTurnstile,
} from "@/api/turnstile/turnstile.api";
import Button from "@/components/Buttons/Button";
import TableRegisterTurnstile from "@/components/FormTables/TableRegisterTurnstile";
import useAlert from "@/hooks/useAlert";
import { Client } from "@/types/Client";
import {
  RegisterTurnstile,
  startLinkWithTurnstileInput,
} from "@/types/Turnstile";

type Props = {
  onClose: () => void;
  client: Client | undefined;
};

const FormLinkTurnstile: React.FC<Props> = ({ onClose, client }) => {
  const alert = useAlert();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const { data: availableId } = useQuery({
    queryKey: ["getAvailableId", client?.id],
    queryFn: getAvailableId,
    enabled: !!client?.id,
    gcTime: 0,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { data: registerTurnstileStatus, refetch } =
    useQuery<RegisterTurnstile>({
      queryKey: ["registerTurnstileStatus"],
      queryFn: getFirstRegisterTurnstile,
      enabled: buttonDisable,
      retry: 0,
      staleTime: 0,
      gcTime: 0,
      refetchInterval: refresh ? 4000 : false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    });

  const form = useForm<startLinkWithTurnstileInput>({
    mode: "onBlur",
    defaultValues: { catracaId: 0, clienteId: 0 },
  });

  const { reset } = form;

  useEffect(() => {
    if (
      registerTurnstileStatus?.errorMessage ||
      registerTurnstileStatus?.success
    ) {
      setRefresh(false);
    }
  }, [registerTurnstileStatus?.errorMessage, registerTurnstileStatus?.success]);

  useEffect(() => {
    if (availableId && client?.id) {
      reset({
        catracaId: availableId.id,
        clienteId: client.id,
      });
    }
  }, [availableId, client?.id, reset]);

  const onClickStartLink = async (data: {
    catracaId: number;
    clienteId: number;
  }) => {
    if (
      !data.catracaId ||
      !data.clienteId ||
      data.catracaId <= 0 ||
      data.clienteId <= 0
    ) {
      alert("Dados inválidos", "error");
      return;
    }
    const result = await startLinkWithTurnstile(data);
    if (!result) {
      await cancelTurnstileOperation();
    } else {
      alert("Catraca iniciou cadastro de biometria", "success");
      setButtonDisable(true);
    }
  };

  return (
    <>
      <DefaultFormatContainerForm title="Vincular catraca">
        <form>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full flex flex-col justify-center items-center text-center">
                {availableId?.id && (
                  <p className="text-sm text-gray-400 mb-4">
                    id da catraca disponível:{" "}
                    <strong className="text-meta-3 text-sm">
                      {availableId?.id}
                    </strong>
                    .
                  </p>
                )}
                <p className="text-sm text-gray-400 mb-4">
                  Você está criando biometria do cliente:{" "}
                  <strong className="text-meta-3 text-sm">
                    {client?.nome || "desconhecido"}
                  </strong>
                  .
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="button"
                disabled={buttonDisable}
                className="flex w-full lg:w-50 justify-center rounded p-3"
                success
                onClick={() => onClickStartLink(form.getValues())}
              >
                iniciar
              </Button>
            </div>
          </div>
        </form>
      </DefaultFormatContainerForm>

      {registerTurnstileStatus && (
        <TableRegisterTurnstile turnstileRegister={registerTurnstileStatus} />
      )}
      {(registerTurnstileStatus?.success ||
        registerTurnstileStatus?.errorMessage) && (
        <DefaultFormatContainerForm>
          <div className="p-6.5">
            <div className=" flex flex-col gap-6 xl:flex-row">
              <div className="w-full flex flex-col justify-center items-center">
                {registerTurnstileStatus?.success && (
                  <>
                    <p className="text-sm text-gray-400 mb-4">
                      Cliente{" "}
                      <strong className="text-meta-3 text-xs">
                        {registerTurnstileStatus.nomeCliente}
                      </strong>{" "}
                      vinculado com sucesso! ID da catraca:{" "}
                      <strong className="text-meta-3 text-sm">
                        {availableId?.id}.
                      </strong>
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      <strong className="text-meta-3 text-sm">
                        Você pode fechar a janela agora.
                      </strong>
                    </p>
                    <div className="flex justify-center items-center">
                      <Button
                        type="button"
                        className="flex w-full lg:w-50 justify-center rounded p-3"
                        success
                        onClick={async () => {
                          await cancelTurnstileOperation();
                          onClose();
                        }}
                      >
                        finalizar
                      </Button>
                    </div>
                  </>
                )}
                {registerTurnstileStatus?.errorMessage && (
                  <>
                    <p className="text-sm text-gray-400 mb-4 text-meta-1">
                      <strong>{registerTurnstileStatus.errorMessage}!</strong>
                    </p>
                    <p className="text-sm text-gray-400 mb-4 text-meta-1">
                      <strong>Feche a janela e tente novamente.</strong>
                    </p>
                    <div className="flex justify-center items-center">
                      <Button
                        type="button"
                        className="flex w-full lg:w-50 justify-center rounded p-3"
                        danger
                        onClick={onClose}
                      >
                        fechar
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DefaultFormatContainerForm>
      )}
    </>
  );
};

export default FormLinkTurnstile;
