import { genericRequest } from "../@genericRequest";

import { CreateUser, UpdateUsuario, User } from "@/types/User";

type EditUserStatus = {
  status: boolean;
  userId: number;
};

export const createUser = async (user: CreateUser): Promise<User> => {
  return await genericRequest<User>("post", "usuario/create", user);
};

export const findAllUsers = async (): Promise<User[]> => {
  return await genericRequest<User[]>("get", "usuario/get-all");
};

export const updateUserStatus = async ({
  status,
  userId,
}: EditUserStatus): Promise<User> => {
  return await genericRequest<User>("put", `usuario/edit-status/${userId}`, {
    status,
  });
};

export const updateUser = async (
  idUser: number,
  user: UpdateUsuario
): Promise<User> => {
  return await genericRequest<User>("put", `usuario/update/${idUser}`, user);
};
