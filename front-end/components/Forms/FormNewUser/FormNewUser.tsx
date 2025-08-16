import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { createUser } from "@/api/users/user.api";
import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import useAlert from "@/hooks/useAlert";
import { createUserSchema } from "@/schemas/userSchemas";
import { CreateUser } from "@/types/User";

type FormNewUserProps = {
  onClose: () => void;
};

const FormNewUser: React.FC<FormNewUserProps> = ({ onClose }) => {
  const { register, handleSubmit, formState, control } = useForm<CreateUser>({
    mode: "onBlur",
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      administrador: false,
    },
  });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      alert("Usuário criado com sucesso", "success");
      onClose();
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: CreateUser) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Novo usuário">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex gap-6 xl:flex-row flex-col">
            <div className="w-full xl:w-1/2">
              <Input
                {...register("nome")}
                type="text"
                label="Nome Completo"
                placeholder="Digite o nome completo"
                error={errors.nome?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                {...register("email")}
                type="text"
                label="E-mail"
                placeholder="Digite o e-mail"
                error={errors.email?.message}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Input
                {...register("senha")}
                label="Senha"
                type="password"
                placeholder="Digite a senha do usuário"
                error={errors.senha?.message}
              />
            </div>
            <div className="w-full xl:w-1/2 flex items-center justify-center">
              <Controller
                control={control}
                name="administrador"
                render={({ field }) => (
                  <CheckBox
                    classLabel="mb-3"
                    id="administrador"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  >
                    <span className="text-white">Administrador</span>
                  </CheckBox>
                )}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row"></div>
          <div className="flex justify-center items-center">
            <Button
              disabled={isSubmitting}
              type="submit"
              className={`flex w-full lg:w-100 justify-center p-3 rounded`}
              primary
            >
              Criar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormNewUser;
