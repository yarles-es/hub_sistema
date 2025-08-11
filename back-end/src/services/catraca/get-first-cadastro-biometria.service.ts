import { NotFoundError } from '../../errors/NotFoundError';
import { GetCadastroBiometria, GetCadastroBiometriaResponse } from '../../types/cadastro-biometria.types';
import { CadastroBiometriaService } from './@cadastro-biometria.service';
import { Service } from 'typedi';

@Service()
export class GetFirstCadastroBiometriaService {
  constructor(private readonly cadastroBiometriaService: CadastroBiometriaService) {}

  async execute(): Promise<GetCadastroBiometriaResponse> {
    const result = await this.cadastroBiometriaService.findFirst();
    if (!result) {
      throw new NotFoundError('Cadastro de biometria não encontrado');
    }
    const { Cliente, ...rest } = result;
    const newData = {
      nomeCliente: Cliente.nome,
      ...rest,
    };
    return newData;
  }
}
