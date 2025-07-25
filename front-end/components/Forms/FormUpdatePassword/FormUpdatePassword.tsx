import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import DefaultFormatContainerForm from "../DefaultFormatContainerForm";

import { updateUserPassword } from "@/api/users/user";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import useAlert from "@/hooks/useAlert";
import { useUserData } from "@/hooks/useUserData";
import { updatePasswordSchema } from "@/schemas/userSchemas";
import { UpdateUserPassword } from "@/types/User";

type FormUpdatePasswordProps = {
  onclose: () => void;
};

const FormUpdatePassword: React.FC<FormUpdatePasswordProps> = ({ onclose }) => {
  const user = useUserData();
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const { register, handleSubmit, formState } = useForm<UpdateUserPassword>({
    mode: "onBlur",
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      userId: Number(user?.id) || 0,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { errors, isSubmitting } = formState;

  const alert = useAlert();

  const { mutate } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      alert("Senha atualizada com sucesso", "success");
      onclose();
    },
    onError: (error) => {
      if (error.message.includes("Senha atual inválida")) {
        setErrorCurrentPassword("Senha atual inválida");
      } else {
        setErrorCurrentPassword("");
      }
      alert(error.message, "error");
      console.error(error);
    },
    retry: 0,
  });

  const handleSubmitData = (data: UpdateUserPassword) => {
    mutate(data);
  };

  return (
    <DefaultFormatContainerForm title="Atualizar senha">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Input
                autoComplete="currentPassword"
                {...register("currentPassword")}
                type="password"
                label="Senha atual"
                placeholder="Digite a senha atual"
                error={errors.currentPassword?.message || errorCurrentPassword}
              />
              <input
                type="email"
                defaultValue={user?.email}
                autoComplete="username"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <Input
                autoComplete="newPassword"
                {...register("newPassword")}
                type="password"
                label="Nova senha"
                placeholder="Digite a nova senha"
                error={errors.newPassword?.message}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <Input
                autoComplete="confirmPassword"
                {...register("confirmPassword")}
                type="password"
                label="Confirmar nova senha"
                placeholder="Digite a nova senha novamente"
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              disabled={isSubmitting}
              type="submit"
              className={`flex w-full lg:w-100 justify-center p-3 rounded `}
              primary
            >
              Alterar
            </Button>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormUpdatePassword;
