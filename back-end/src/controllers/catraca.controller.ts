import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import {
  ErrorCadastroBiometriaResponse,
  IniciarCadastroBiometriaResponse,
  PassosCadastroBiometriaResponse,
  Webhook,
  WebhookCommand771,
  WebhookCommand774,
} from '../types/catraca.types';
import { EntradasaidaCatracaService } from '../services/catraca/entrada-saida-catraca.service';
import { BuscaIdDisponivelRegistroService } from '../services/catraca/busca-id-disponivel-registro.service';
import { EtapasCadastroBiometriaService } from '../services/catraca/etapas-cadastro-biometria.service';
import { IniciarCadastroBiometriaService } from '../services/catraca/iniciar-cadastro-biometria.service';
import { bloquearEntradaCatraca } from '../api/catraca/bloquear-entrada-catraca';

@Service()
export class CatracaController {
  constructor(
    private readonly entradasaidaCatracaService: EntradasaidaCatracaService,
    private readonly buscaIdDisponivelRegistroService: BuscaIdDisponivelRegistroService,
    private readonly etapasCadastroBiometriaService: EtapasCadastroBiometriaService,
    private readonly iniciarCadastroBiometriaService: IniciarCadastroBiometriaService,
  ) {}
  public async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as Webhook;
      const { command } = body;
      console.log(body);

      if (command === 774) {
        // comando manda para o controle de entrada e saida do usuario
        await this.entradasaidaCatracaService.execute(req.body as WebhookCommand774);

        res.status(200).send();
      } else if (command === 771) {
        await this.entradasaidaCatracaService.execute(req.body as WebhookCommand771);

        res.status(200).send();
      } else if (command === 775) {
        // comando quando n identifica alguem na catraca
        await bloquearEntradaCatraca();

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

  public async iniciarCadastroBiometria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { clienteId, catracaId } = req.body;

      const result = await this.iniciarCadastroBiometriaService.execute(clienteId, catracaId);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async buscarIdDisponivel(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = await this.buscaIdDisponivelRegistroService.execute();

      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }
}
