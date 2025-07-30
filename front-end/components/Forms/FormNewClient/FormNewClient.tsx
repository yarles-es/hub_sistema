import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { createClient } from "@/api/client/client.api";
import useAlert from "@/hooks/useAlert";
import { createClientSchema } from "@/schemas/clientSchemas";
import { CreateClient } from "@/types/Client";

type Props = {
  onClose: () => void;
};

const FormNewClient: React.FC<Props> = ({ onClose }) => {
  const { register, handleSubmit, formState, control } = useForm<CreateClient>({
    mode: "onBlur",
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      planoId: 0,
    },
  });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useMutation({
    mutationFn: createClient,

    onSuccess: () => {
      alert("Cliente cadastrado com sucesso!", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: CreateClient) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Novo Cliente">
      <form></form>
    </DefaultFormatContainerForm>
  );
};

export default FormNewClient;
