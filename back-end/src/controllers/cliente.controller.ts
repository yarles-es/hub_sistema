import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ActiveClienteService } from '../services/cliente/active-cliente.service';
import { CreateClienteService } from '../services/cliente/create-cliente.service';
import { DisableClienteService } from '../services/cliente/disable-cliente.service';
import { GetAllClientesService } from '../services/cliente/get-all-clientes.service';
import { GetClienteByEmailService } from '../services/cliente/get-cliente-by-email.service';
import { GetClienteByIdService } from '../services/cliente/get-cliente-by-id.service';
import { UpdateClienteService } from '../services/cliente/update-cliente.service';
import { CreateClienteRequest, StatusCliente } from '../types/cliente.types';
import { safeParseDate, safeParseInt, safeParseString } from '../utils/safeTypes';
import { GetAllClientesByNameService } from '../services/cliente/get-all-clientes-by-name.service';
import { GetAllByBirthdayPeopleMonthService } from '../services/cliente/get-all-by-birthday-people-month.service';

@Service()
export class ClienteController {
  constructor(
    private readonly createClienteService: CreateClienteService,
    private readonly getClienteByIdService: GetClienteByIdService,
    private readonly getClienteByEmailService: GetClienteByEmailService,
    private readonly updateClienteService: UpdateClienteService,
    private readonly getAllClientesService: GetAllClientesService,
    private readonly disableClienteService: DisableClienteService,
    private readonly activeClienteService: ActiveClienteService,
    private readonly getAllClientesByNameService: GetAllClientesByNameService,
    private readonly getAllByBirthdayPeopleMonthService: GetAllByBirthdayPeopleMonthService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cliente = await this.createClienteService.execute(req.body as CreateClienteRequest);
      res.status(201).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cliente = await this.getClienteByIdService.execute(Number(req.params.id));
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async getByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cliente = await this.getClienteByEmailService.execute(req.params.email as string);
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedCliente = await this.updateClienteService.execute(
        Number(req.params.id),
        req.body as Partial<CreateClienteRequest>,
      );
      res.status(200).json(updatedCliente);
    } catch (error) {
      next(error);
    }
  }

  async getByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name = req.params.name as string;
      const clientes = await this.getAllClientesByNameService.execute(name);
      res.status(200).json(clientes);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
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

      const clientes = await this.getAllClientesService.execute(page, limitNumber, {
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

  async disable(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cliente = await this.disableClienteService.execute(Number(req.params.id));
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async active(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cliente = await this.activeClienteService.execute(Number(req.params.id));
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async getAllByBirthdayPeopleMonth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clientes = await this.getAllByBirthdayPeopleMonthService.execute();
      res.status(200).json(clientes);
    } catch (error) {
      next(error);
    }
  }
}
