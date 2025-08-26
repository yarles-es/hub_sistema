import { NextFunction, Response } from 'express';
import { Service } from 'typedi';
import { ActiveClienteService } from '../services/cliente/active-cliente.service';
import { CreateClienteService } from '../services/cliente/create-cliente.service';
import { DisableClienteService } from '../services/cliente/disable-cliente.service';
import { GetAllClientesFilteredService } from '../services/cliente/get-all-clientes-filtered.service';
import { GetClienteByEmailService } from '../services/cliente/get-cliente-by-email.service';
import { GetClienteByIdService } from '../services/cliente/get-cliente-by-id.service';
import { UpdateClienteService } from '../services/cliente/update-cliente.service';
import { CreateClienteRequest, StatusCliente } from '../types/cliente.types';
import { safeParseDate, safeParseInt, safeParseString } from '../utils/safeTypes';
import { GetAllClientesByNameService } from '../services/cliente/get-all-clientes-by-name.service';
import { GetAllByBirthdayPeopleMonthService } from '../services/cliente/get-all-by-birthday-people-month.service';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { AuthenticatedRequest } from '../types/Request.types';
import { GetCountTypeClientesService } from '../services/cliente/get-count-type-clientes.service';

@Service()
export class ClienteController {
  constructor(
    private readonly createClienteService: CreateClienteService,
    private readonly getClienteByIdService: GetClienteByIdService,
    private readonly getClienteByEmailService: GetClienteByEmailService,
    private readonly updateClienteService: UpdateClienteService,
    private readonly getAllClientesFilteredService: GetAllClientesFilteredService,
    private readonly disableClienteService: DisableClienteService,
    private readonly activeClienteService: ActiveClienteService,
    private readonly getAllClientesByNameService: GetAllClientesByNameService,
    private readonly getAllByBirthdayPeopleMonthService: GetAllByBirthdayPeopleMonthService,
    private readonly getCountTypeClientesService: GetCountTypeClientesService,
    private readonly log: CreateLogService,
  ) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const cliente = await this.createClienteService.execute(req.body as CreateClienteRequest);

      await this.log.execute(user.id, 'Criou cliente', cliente.id);

      res.status(201).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const cliente = await this.getClienteByIdService.execute(Number(req.params.id));

      await this.log.execute(user.id, 'Buscou cliente por ID', cliente.id);

      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async getByEmail(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const cliente = await this.getClienteByEmailService.execute(req.params.email as string);

      await this.log.execute(user.id, 'Buscou cliente por email', cliente.id);

      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const updatedCliente = await this.updateClienteService.execute(
        Number(req.params.id),
        req.body as Partial<CreateClienteRequest>,
      );

      await this.log.execute(user.id, 'Atualizou cliente', updatedCliente.id);

      res.status(200).json(updatedCliente);
    } catch (error) {
      next(error);
    }
  }

  async getByName(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const name = req.params.name as string;

      const clientes = await this.getAllClientesByNameService.execute(name);

      await this.log.execute(user.id, 'Buscou clientes por nome');

      res.status(200).json(clientes);
    } catch (error) {
      next(error);
    }
  }

  async getCountTypeClientes(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const count = await this.getCountTypeClientesService.execute();
      res.status(200).json(count);
    } catch (error) {
      next(error);
    }
  }

  async getAllFiltered(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { numberPage, limit, nome, email, telefone, dataNascimento, diaMensalidade, status, planoId } =
        req.query;

      const page = safeParseInt(numberPage) || 1;
      const limitNumber = safeParseInt(limit) || 30;
      const nomeQuery = safeParseString(nome);
      const emailQuery = safeParseString(email);
      const telefoneQuery = safeParseString(telefone);
      const dataNascimentoQuery = safeParseDate(dataNascimento);
      const diaMensalidadeQuery = safeParseInt(diaMensalidade);
      const statusQuery = safeParseString(status) as StatusCliente | undefined;
      const planoIdQuery = safeParseInt(planoId);

      const clientes = await this.getAllClientesFilteredService.execute(page, limitNumber, {
        nome: nomeQuery,
        email: emailQuery,
        telefone: telefoneQuery,
        dataNascimento: dataNascimentoQuery,
        diaMensalidade: diaMensalidadeQuery,
        status: statusQuery,
        planoId: planoIdQuery,
      });

      res.status(200).json(clientes);
    } catch (error) {
      next(error);
    }
  }

  async disable(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const cliente = await this.disableClienteService.execute(Number(req.params.id));

      await this.log.execute(user.id, 'Desativou cliente', cliente.id);

      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async active(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const cliente = await this.activeClienteService.execute(Number(req.params.id));

      await this.log.execute(user.id, 'Ativou cliente', cliente.id);

      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async getAllByBirthdayPeopleMonth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const clientes = await this.getAllByBirthdayPeopleMonthService.execute();

      res.status(200).json(clientes);
    } catch (error) {
      next(error);
    }
  }
}
