import { Service } from 'typedi';
import { CadastroBiometriaService } from './@cadastro-biometria.service';
import {
  ErrorCadastroBiometriaResponse,
  IniciarCadastroBiometriaResponse,
  PassosCadastroBiometriaResponse,
} from '../../types/catraca.types';
import {
  messageFailToRegisterBiometria,
  messageFirstTimeRegisterBiometria,
  messageSecondTimeRegisterBiometria,
  messageSucessRegisterBiometria,
  messageThirdTimeRegisterBiometria,
} from '../../constants/messagesBiometria';
import { ClienteService } from '../cliente/@cliente.service';
import { withTransaction } from '../../utils/withTransaction';
import { cancelarOperacaoBiometria } from '../../api/biometria/cancelar-operacao-biometria';
import { bloquearEntradaCatraca } from '../../api/catraca/bloquear-entrada-catraca';
import { notificacaoPositiva } from '../../api/catraca/notificacao-positiva';
import { Prisma } from '@prisma/client';

@Service()
export class EtapasCadastroBiometriaService {
  constructor(
    private readonly cadastroBiometriaService: CadastroBiometriaService,
    private readonly clienteService: ClienteService,
  ) {}

  async executeError(body: ErrorCadastroBiometriaResponse): Promise<void> {
    const {
      response: {
        enrollStatus: { description, isSuccess },
      },
    } = body;

    if (description === messageFailToRegisterBiometria && !isSuccess) {
      await this.failRegister();
      await bloquearEntradaCatraca();
    }
  }

  async execute(body: IniciarCadastroBiometriaResponse | PassosCadastroBiometriaResponse) {
    if (this.typeGuard(body)) {
      return;
    } else {
      const {
        response: { enroll },
      } = body;

      if (enroll === messageFirstTimeRegisterBiometria) return;

      if (enroll === messageSecondTimeRegisterBiometria) await this.executeSecondStep();

      if (enroll === messageThirdTimeRegisterBiometria) await this.executeThirdStep();

      if (enroll === messageSucessRegisterBiometria) await this.executeFinalStep();
    }
  }

  async executeSecondStep(): Promise<void> {
    const cadastroBiometria = await this.cadastroBiometriaService.findFirst();
    if (!cadastroBiometria) {
      await this.failRegister();
      return;
    }
    await this.cadastroBiometriaService.update(cadastroBiometria.id, {
      segundaEtapa: true,
    });
  }

  async executeThirdStep(): Promise<void> {
    const cadastroBiometria = await this.cadastroBiometriaService.findFirst();
    if (!cadastroBiometria) {
      await this.failRegister();
      return;
    }
    await this.cadastroBiometriaService.update(cadastroBiometria.id, {
      terceiraEtapa: true,
    });
  }

  async executeFinalStep(): Promise<void> {
    const cadastroBiometria = await this.cadastroBiometriaService.findFirst();
    if (!cadastroBiometria) {
      await this.failRegister();
      return;
    }

    try {
      await withTransaction(async (tx) => {
        await this.clienteService.updateCliente(
          cadastroBiometria.clienteId,
          { catracaId: cadastroBiometria.idCatraca },
          tx,
        );

        await this.cadastroBiometriaService.delete(cadastroBiometria.id, tx);
      });

      await cancelarOperacaoBiometria();
      await notificacaoPositiva();
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        await this.failRegister();
        return;
      }
      await this.failRegister();
    }
  }

  async failRegister(): Promise<void> {
    try {
      const cadastroBiometria = await this.cadastroBiometriaService.findFirst();
      if (!cadastroBiometria) return;
      await this.cadastroBiometriaService.update(cadastroBiometria.id, {
        errorMessage: 'Erro ao registrar biometria, possivel dedo já cadastrado na catraca',
      });

      await cancelarOperacaoBiometria();
    } catch (error) {
      console.error('Erro incomum nas etapas de registro de biometria:', error);
      return;
    }
  }

  typeGuard(
    body: IniciarCadastroBiometriaResponse | PassosCadastroBiometriaResponse,
  ): body is IniciarCadastroBiometriaResponse {
    return (
      body !== null &&
      typeof body === 'object' &&
      'response' in body &&
      typeof (body as any).response === 'object' &&
      'data' in (body as any).response &&
      typeof (body as any).response.data === 'object' &&
      'content' in (body as any).response.data
    );
  }
}
