import React from "react";

import { useMutation } from "@tanstack/react-query";

import Button from "../Buttons/Button";
import BirthdayPeopleTable from "../Tables/BirthdayPeopleTable";
import TurnstileConfig from "../TurnstileConfig/TurnstileConfig";

import {
  freeTurnstile,
  releaseTurnstileEntry,
  releaseTurnstileExit,
} from "@/api/turnstile/turnstile.api";
import useAlert from "@/hooks/useAlert";

type Props = {
  init?: boolean;
};

const TurnstileController: React.FC<Props> = ({ init }) => {
  const alert = useAlert();

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      action: "liberar-entrada" | "liberar-saida" | "catraca-livre"
    ) => {
      const functions = {
        "liberar-entrada": async () => await releaseTurnstileEntry(),
        "liberar-saida": async () => await releaseTurnstileExit(),
        "catraca-livre": async () => await freeTurnstile(),
      };
      return await functions[action]();
    },
    onSuccess: () => {
      alert("Operação realizada com sucesso!", "success");
    },
    onError: () => {
      alert("Erro ao realizar operação.", "error");
    },
  });

  const handleButtonClick = (
    action: "liberar-entrada" | "liberar-saida" | "catraca-livre"
  ) => {
    mutate(action);
  };

  return (
    <div className="xl:w-1/2 rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto h-[calc(100dvh-175px)] md:h-[calc(100vh-130px)]  overscroll- flex flex-col justify-center">
      <div className="p-6 flex justify-center items-center flex-wrap gap-2 mt-5">
        <Button
          className="flex w-full lg:w-60 justify-center rounded p-3 text-lg m-2"
          success
          disabled={isPending}
          onClick={() => handleButtonClick("liberar-entrada")}
        >
          Liberar Entrada
        </Button>
        <Button
          className="flex w-full lg:w-60 justify-center rounded p-3 text-lg m-2"
          danger
          disabled={isPending}
          onClick={() => handleButtonClick("liberar-saida")}
        >
          Liberar Saida
        </Button>
        <Button
          className="flex w-full lg:w-60 justify-center rounded p-3 text-lg m-2"
          warning
          disabled={isPending}
          onClick={() => handleButtonClick("catraca-livre")}
        >
          Catraca Livre
        </Button>
      </div>
      {!init ? <TurnstileConfig /> : <BirthdayPeopleTable />}
    </div>
  );
};

export default TurnstileController;
