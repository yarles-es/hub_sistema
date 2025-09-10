import { genericRequest } from "../@genericRequest";

import { CreateUser, UpdateUsuario, User } from "@/types/User";

export type EditUserStatus = {
  status: boolean;
  userId: number;
};

export const createUser = async (user: CreateUser): Promise<User> => {
  return await genericRequest<User>("post", "usuario/create", { body: user });
};

export const findAllUsers = async (): Promise<User[]> => {
  return await genericRequest<User[]>("get", "usuario/get-all");
};

export const updateUserStatus = async ({
  status,
  userId,
}: EditUserStatus): Promise<User> => {
  return await genericRequest<User>("put", `usuario/edit-status/${userId}`, {
    body: { status },
  });
};

export const updateUser = async (
  idUser: number,
  user: UpdateUsuario
): Promise<User> => {
  const editedUser: UpdateUsuario = {
    email: user.email ?? undefined,
    nome: user.nome ?? undefined,
    ativo: user.ativo ?? undefined,
    senha: user.senha ?? undefined,
    administrador: user.administrador ?? undefined,
  };
  return await genericRequest<User>("put", `usuario/update/${idUser}`, {
    body: editedUser,
  });
};
