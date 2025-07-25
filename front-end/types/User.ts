export type User = {
  id: number;
  nome: string;
  email: string;
  administrador: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateUser = Pick<User, "nome" | "email" | "administrador"> & {
  senha: string;
};

export type UpdateUsuario = {
  email?: string;
  nome?: string;
  ativo?: boolean;
  senha?: string;
  administrador?: boolean;
};

export type EditedUserData = {
  id: number;
  nome: string;
  email: string;
  administrador: boolean;
  senha?: string;
  ativo: boolean;
};
