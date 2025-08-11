import { CadastroBiometria } from '@prisma/client';

export type CreateCadastroBiometria = Pick<CadastroBiometria, 'clienteId' | 'idCatraca'>;

export type UpdateCadastroBiometria = Partial<
  Pick<CadastroBiometria, 'primeiraEtapa' | 'segundaEtapa' | 'terceiraEtapa' | 'errorMessage' | 'success'>
>;

export type GetCadastroBiometria = CadastroBiometria & {
  Cliente: {
    nome: string;
  };
};

export type GetCadastroBiometriaResponse = CadastroBiometria & {
  nomeCliente: string;
};
