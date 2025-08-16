import { NextFunction, Response } from 'express';
import { Service } from 'typedi';
import {
  ErrorCadastroBiometriaResponse,
  IniciarCadastroBiometriaResponse,
  PassosCadastroBiometriaResponse,
  Webhook,
  WebhookCommand774,
} from '../types/catraca.types';
import { EntradasaidaCatracaService } from '../services/catraca/entrada-saida-catraca.service';
import { BuscaIdDisponivelRegistroService } from '../services/catraca/busca-id-disponivel-registro.service';
import { EtapasCadastroBiometriaService } from '../services/catraca/etapas-cadastro-biometria.service';
import { IniciarCadastroBiometriaService } from '../services/catraca/iniciar-cadastro-biometria.service';
import { CancelarOperacaoBiometriaService } from '../services/catraca/cancelar-operacao-biometria.service';
import { GetFirstCadastroBiometriaService } from '../services/catraca/get-first-cadastro-biometria.service';
import { LimparTemplatePorIdService } from '../services/catraca/limpar-template-por-id.service';
import { BuscaMensagensCatracaService } from '../services/catraca/busca-mensagens-catraca.service';
import { BuscaDuracaoInteracaoCatracaService } from '../services/catraca/busca-duracao-interacao-catraca.service';
import { LiberarSaidaCatracaService } from '../services/catraca/liberar-saida-catraca.service';
import { LiberarEntradaCatracaService } from '../services/catraca/liberar-entrada-catraca.service';
import { ConectarCatracaService } from '../services/catraca/conectar-catraca.service';
import { DesconectarCatracaService } from '../services/catraca/desconectar-catraca.service';
import { SetarDuracaoInteracaoCatracaService } from '../services/catraca/setar-duracao-interacao-catraca.service';
import { SetarPrimeiraMensagemCatracaService } from '../services/catraca/setar-primeira-mensagem-catraca.service';
import { SetarSegundaMensagemCatracaService } from '../services/catraca/setar-segunda-mensagem-catraca.service';
import { SetarMensagemBloqueioCatracaService } from '../services/catraca/setar-mensagem-bloqueio-catraca.service';
import { SetarSentidoHorarioCatracaService } from '../services/catraca/setar-sentido-horario-catraca.service';
import { SetarTipoControleFluxoCatracaService } from '../services/catraca/setar-tipo-controle-fluxo-catraca.service';
import { SetarTipoFluxoBiometriaCatracaService } from '../services/catraca/setar-tipo-fluxo-biometria-catraca.service';
import { EntradaNaoIdentificadaService } from '../services/catraca/entrada-nao-identificada.service';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { AuthenticatedRequest } from '../types/Request.types';

@Service()
export class CatracaController {
  constructor(
    private readonly entradasaidaCatracaService: EntradasaidaCatracaService,
    private readonly buscaIdDisponivelRegistroService: BuscaIdDisponivelRegistroService,
    private readonly etapasCadastroBiometriaService: EtapasCadastroBiometriaService,
    private readonly iniciarCadastroBiometriaService: IniciarCadastroBiometriaService,
    private readonly cancelarOperacaoBiometriaService: CancelarOperacaoBiometriaService,
    private readonly getFirstCadastroBiometriaService: GetFirstCadastroBiometriaService,
    private readonly limparTemplatePorIdService: LimparTemplatePorIdService,
    private readonly buscaMensagensCatracaService: BuscaMensagensCatracaService,
    private readonly buscaDuracaoInteracaoCatracaService: BuscaDuracaoInteracaoCatracaService,
    private readonly liberarSaidaCatracaService: LiberarSaidaCatracaService,
    private readonly liberarEntradaCatracaService: LiberarEntradaCatracaService,
    private readonly desconectarCatracaService: DesconectarCatracaService,
    private readonly conectarCatracaService: ConectarCatracaService,
    private readonly liberarLivreCatracaService: LiberarSaidaCatracaService,
    private readonly setarDuracaoInteracaoCatracaService: SetarDuracaoInteracaoCatracaService,
    private readonly setarPrimeiraMensagemCatracaService: SetarPrimeiraMensagemCatracaService,
    private readonly setarSegundaMensagemCatracaService: SetarSegundaMensagemCatracaService,
    private readonly setarMensagemBloqueioCatracaService: SetarMensagemBloqueioCatracaService,
    private readonly setarSentidoHorarioCatracaService: SetarSentidoHorarioCatracaService,
    private readonly setarTipoControleFluxoCatracaService: SetarTipoControleFluxoCatracaService,
    private readonly setarTipoFluxoBiometriaCatracaService: SetarTipoFluxoBiometriaCatracaService,
    private readonly entradaNaoIdentificadaService: EntradaNaoIdentificadaService,
    private readonly log: CreateLogService,
  ) {}
  public async webhook(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as Webhook;
      const { command } = body;

      if (command === 774 || command === 771) {
        // comando manda para o controle de entrada e saida do usuario
        await this.entradasaidaCatracaService.execute(req.body as WebhookCommand774);

        res.status(200).send();
      } else if (command === 775) {
        // comando quando n identifica alguem na catraca
        await this.entradaNaoIdentificadaService.execute();

        res.status(200).send();
      } else if (command === 259) {
        // comando que controla as etapas do cadastro da biometria
        await this.etapasCadastroBiometriaService.execute(
          req.body as IniciarCadastroBiometriaResponse | PassosCadastroBiometriaResponse,
        );

        res.status(200).send();
      } else if (command === 23205) {
        // comando que recebe quando acontece erro no registro de biometria
        await this.etapasCadastroBiometriaService.executeError(req.body as ErrorCadastroBiometriaResponse);

        res.status(200).send();
      }
    } catch (error) {
      next(error);
    }
  }

  public async iniciarCadastroBiometria(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { clienteId, catracaId } = req.body;

      const result = await this.iniciarCadastroBiometriaService.execute(clienteId, catracaId);

      await this.log.execute(user.id, 'Iniciou cadastro de biometria', clienteId);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async buscarIdDisponivel(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const id = await this.buscaIdDisponivelRegistroService.execute();

      await this.log.execute(user.id, 'Buscou ID disponível da Catraca');

      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }

  public async cancelarOperacaoBiometria(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      await this.cancelarOperacaoBiometriaService.execute();

      await this.log.execute(user.id, 'Cancelou operação de biometria');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async getCadastroBiometria(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const result = await this.getFirstCadastroBiometriaService.execute();

      await this.log.execute(user.id, 'Buscou primeiro cadastro de biometria');

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async limparTemplatePorId(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { id } = req.params;

      const result = await this.limparTemplatePorIdService.execute(Number(id));

      await this.log.execute(user.id, 'Limpou template por ID', Number(id));

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async buscarMensagens(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.buscaMensagensCatracaService.execute();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async buscarDuracaoInteracao(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.buscaDuracaoInteracaoCatracaService.execute();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async liberarSaida(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      await this.liberarSaidaCatracaService.execute();

      await this.log.execute(user.id, 'Liberou saída da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async liberarEntrada(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      await this.liberarEntradaCatracaService.execute();

      await this.log.execute(user.id, 'Liberou entrada da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async conectar(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.conectarCatracaService.execute();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async desconectar(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.desconectarCatracaService.execute();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async liberarLivre(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      await this.liberarLivreCatracaService.execute();

      await this.log.execute(user.id, 'Liberou livre da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async setarDuracaoInteracao(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { duracao } = req.body;

      await this.setarDuracaoInteracaoCatracaService.execute(duracao as number);

      await this.log.execute(user.id, 'Setou duração de interação da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async setarPrimeiraMensagem(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { mensagem } = req.body;

      await this.setarPrimeiraMensagemCatracaService.execute(mensagem);

      await this.log.execute(user.id, 'Setou primeira mensagem da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async setarSegundaMensagem(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { mensagem } = req.body;

      await this.setarSegundaMensagemCatracaService.execute(mensagem);

      await this.log.execute(user.id, 'Setou segunda mensagem da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async setarMensagemBloqueio(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { mensagem } = req.body;

      await this.setarMensagemBloqueioCatracaService.execute(mensagem);

      await this.log.execute(user.id, 'Setou mensagem de bloqueio da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async setarSentidoHorario(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { sentidoHorario } = req.body;

      await this.setarSentidoHorarioCatracaService.execute(sentidoHorario);

      await this.log.execute(user.id, 'Setou sentido horário da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async setarTipoControleFluxo(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { tipo } = req.body;

      await this.setarTipoControleFluxoCatracaService.execute(tipo as number);

      await this.log.execute(user.id, 'Setou tipo de controle de fluxo da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async setarTipoFluxoBiometria(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user!;

      const { tipo } = req.body;

      await this.setarTipoFluxoBiometriaCatracaService.execute(Number(tipo));

      await this.log.execute(user.id, 'Setou tipo de fluxo de biometria da Catraca');

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
