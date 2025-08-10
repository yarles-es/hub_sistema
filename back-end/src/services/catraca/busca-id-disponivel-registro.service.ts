import { Service } from 'typedi';
import { buscarIdDisponivel } from '../../api/biometria/buscar-id-disponivel';
import { BadRequestError } from '../../errors/BadRequestError';

@Service()
export class BuscaIdDisponivelRegistroService {
  public async execute(): Promise<number> {
    const {
      response: {
        data: { content: id },
      },
    } = await buscarIdDisponivel();

    if (!id) {
      throw new BadRequestError('Nenhum id disponível encontrado');
    }

    return id;
  }
}
