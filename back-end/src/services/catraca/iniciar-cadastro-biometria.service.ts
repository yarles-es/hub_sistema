import { Service } from 'typedi';
import { CadastroBiometriaService } from './@cadastro-biometria.service';
import { ClienteService } from '../cliente/@cliente.service';
import { NotFoundError } from '../../errors/NotFoundError';
import { BuscaIdDisponivelRegistroService } from './busca-id-disponivel-registro.service';
import { BadRequestError } from '../../errors/BadRequestError';
import { CadastroBiometria } from '@prisma/client';
import { iniciarCadastroBiometria } from '../../api/biometria/iniciar-cadastro-biometria';

@Service()
export class IniciarCadastroBiometriaService {
  constructor(
    private readonly cadastroBiometriaService: CadastroBiometriaService,
    private readonly clienteService: ClienteService,
    private readonly buscaIdDisponivelRegistroService: BuscaIdDisponivelRegistroService,
  ) {}

  public async execute(clienteId: number, idCatraca: number): Promise<CadastroBiometria> {
    await this.validate(clienteId, idCatraca);
    const cadastroBiometria = await this.cadastroBiometriaService.findFirst();

    if (cadastroBiometria) {
      await this.cadastroBiometriaService.delete(cadastroBiometria.id);
    }

    const result = await this.cadastroBiometriaService.create({ clienteId, idCatraca });
    await iniciarCadastroBiometria(idCatraca);
    return result;
  }

  public async validate(clienteId: number, idCatraca: number): Promise<void> {
    const cliente = await this.clienteService.getClienteById(clienteId);
    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    if (cliente.catracaId) {
      throw new BadRequestError('Cliente já possui cadastro de biometria registrado');
    }

    const id = await this.buscaIdDisponivelRegistroService.execute();

    if (id !== idCatraca) {
      throw new BadRequestError('O id disponível enviado não corresponde ao id disponivel da catraca');
    }
  }
}
