import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import { updateUser } from "@/api/users/user.api";
import Button from "@/components/Buttons/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Inputs/Input";
import useAlert from "@/hooks/useAlert";
import { updateUserSchema } from "@/schemas/userSchemas";
import { ModalTypeItemUser } from "@/types/ModalTypes";
import { EditedUserData } from "@/types/User";

type Props = {
  user: EditedUserData | undefined;
  onClose: (type: ModalTypeItemUser, error?: string) => void;
};

const FormEditUser: React.FC<Props> = ({ user, onClose }) => {
  const [isModified, setIsModified] = useState(false);

  const { watch, handleSubmit, formState, setValue, control } =
    useForm<EditedUserData>({
      mode: "onBlur",
      resolver: zodResolver(updateUserSchema),
      defaultValues: {
        id: 0,
        nome: "",
        email: "",
        administrador: false,
        senha: "",
      },
    });

  const { errors, isSubmitting } = formState;

  const watchAllFields = watch();

  const alert = useAlert();

  useEffect(() => {
    if (user && user.id !== 0) {
      setValue("nome", user.nome);
      setValue("administrador", user.administrador);
      setValue("email", user.email);
      setValue("id", user.id);
    } else {
      onClose("edit", "Erro ao carregar dados do usuário na edição");
    }
  }, [user, onClose, setValue]);

  useEffect(() => {
    const hasModification =
      watchAllFields.nome !== user?.nome ||
      watchAllFields.email !== user?.email ||
      watchAllFields.administrador !== user?.administrador ||
      watchAllFields.senha !== "";

    setIsModified(hasModification);
  }, [watchAllFields, user]);

  const { mutate } = useMutation({
    mutationFn: (data: EditedUserData) => updateUser(data.id, data),

    onSuccess: () => {
      alert("Usuário editado com sucesso", "success");
      onClose("edit");
    },
    onError: (error) => {
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: EditedUserData) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Edição do Usuário">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className=" p-3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col justify-around">
            <h3 className="mb-2">
              <strong>Dados Atuais:</strong>
            </h3>
            <div className="mb-3 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <p className="mb-1">
                  <strong>Nome: </strong>
                  {user?.nome}
                </p>

                <p>
                  <strong>Email: </strong>
                  {user?.email}
                </p>
                <p>
                  <strong>Administrador:</strong>{" "}
                  {user?.administrador ? "Sim" : "Não"}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4.5 mt-3 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Input
                    name={name}
                    ref={ref}
                    type="text"
                    label="Nome"
                    placeholder="Digite o nome do usuário"
                    value={value}
                    onChange={(e) => onChange(e.target.value.trim())}
                    onBlur={onBlur}
                    error={errors.nome?.message}
                  />
                )}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Input
                    name={name}
                    ref={ref}
                    type="email"
                    label="Email"
                    placeholder="Digite o email do usuário"
                    value={value.toLowerCase()}
                    onChange={(e) =>
                      onChange(e.target.value.toLowerCase().trim())
                    }
                    onBlur={onBlur}
                    error={errors.email?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-4.5 mt-3 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Input
                    name={name}
                    ref={ref}
                    type="password"
                    label="Senha"
                    placeholder="Digite a nova senha do usuário"
                    value={value}
                    onChange={(e) => onChange(e.target.value.trim())}
                    onBlur={onBlur}
                    error={errors.senha?.message}
                  />
                )}
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
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2"></div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              disabled={!isModified || isSubmitting}
              primary
              type="submit"
              className="flex w-full lg:w-100 justify-center rounded p-3"
            >
              Editar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormEditUser;
