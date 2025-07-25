import { genericRequest } from "../@genericRequest";

type Login = {
  login: string;
  senha: string;
};

export const loginApp = async ({ login, senha }: Login): Promise<void> => {
  await genericRequest<void>("post", "/login", {
    login,
    senha,
  });
};
