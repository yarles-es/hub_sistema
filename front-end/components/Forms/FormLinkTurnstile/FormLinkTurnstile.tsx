import { error } from "console";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import {
  cancelTurnstileOperation,
  getAvailableId,
  startLinkWithTurnstile,
} from "@/api/turnstile/turnstile.api";
import Button from "@/components/Buttons/Button";
import useAlert from "@/hooks/useAlert";
import { Client } from "@/types/Client";
import { startLinkWithTurnstileInput } from "@/types/Turnstile";

type Props = {
  onClose: () => void;
  client: Client | undefined;
};

const FormLinkTurnstile: React.FC<Props> = ({ onClose, client }) => {
  const alert = useAlert();

  const [buttonDisable, setButtonDisable] = useState(false);

  const { data: availableId, isLoading } = useQuery({
    queryKey: ["getAvailableId", client?.id],
    queryFn: getAvailableId,
    enabled: !!client?.id,
    retry: 0,
  });

  const { data: registerTurnstileStatus, isLoading: isRegisterLoading } =
    useQuery({
      queryKey: ["registerTurnstileStatus"],
      queryFn: async () => {},
      enabled: buttonDisable,
      retry: 0,
    });

  const form = useForm<startLinkWithTurnstileInput>({
    mode: "onBlur",
    defaultValues: { catracaId: 0, clienteId: 0 },
  });

  const { reset } = form;

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
    <DefaultFormatContainerForm title="Vincular catraca">
      <form>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full flex flex-col justify-center items-center">
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
  );
};

export default FormLinkTurnstile;
