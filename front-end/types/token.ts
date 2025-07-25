export type DecodedToken = {
  data: {
    id: number;
    nome: string;
    email: string;
    administrador: boolean;
    ativo: boolean;
  };
};
