import React from "react";

import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import { useDeleteDaily } from "@/hooks/queries/dailies/useDeleteDaily";
import useAlert from "@/hooks/useAlert";

type Props = {
  onClose: () => void;
  itemSelected: number;
};

export const FormDeleteDaily: React.FC<Props> = ({ onClose, itemSelected }) => {
  const alert = useAlert();

  const { mutate } = useDeleteDaily({
    onSuccess: () => {
      alert("Diária deletada com sucesso!", "success");
      onClose();
    },
    onError: (error: any) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleDelete = () => {
    mutate(itemSelected);
  };

  return (
    <DefaultFormatContainerForm title="Deletar Diária">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full flex flex-col justify-center items-center text-center">
              <h1 className="mb-4">
                <strong className="text-meta-1 text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a excluir a diária com ID ={" "}
                <strong className="text-meta-1 text-lg">{itemSelected}</strong>
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Esta ação não pode ser desfeita. Tem certeza de que deseja
                prosseguir?
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="button"
                className="flex w-full lg:w-50 justify-center rounded p-3"
                danger
                onClick={handleDelete}
              >
                Sim
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};
