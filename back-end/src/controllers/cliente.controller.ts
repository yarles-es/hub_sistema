import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateClienteService } from '../services/cliente/create-cliente.service';
import { GetAllClientesService } from '../services/cliente/get-all-clientes.service';
import { GetClienteByEmailService } from '../services/cliente/get-cliente-by-email.service';
import { GetClienteByIdService } from '../services/cliente/get-cliente-by-id.service';
import { UpdateClienteService } from '../services/cliente/update-cliente.service';
import { CreateClienteRequest, StatusCliente } from '../types/cliente.types';
import { safeParseDate, safeParseInt, safeParseString } from '../utils/safeTypes';

@Service()
export class ClienteController {
  constructor(
    private readonly createClienteService: CreateClienteService,
    private readonly getClienteByIdService: GetClienteByIdService,
    private readonly getClienteByEmailService: GetClienteByEmailService,
    private readonly updateClienteService: UpdateClienteService,
    private readonly getAllClientesService: GetAllClientesService,
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

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { numberPage, limit, nome, email, telefone, dataNascimento, diaMensalidade, status } = req.query;

      const page = safeParseInt(numberPage) || 1;
      const limitNumber = safeParseInt(limit) || 30;
      const nomeQuery = safeParseString(nome);
      const emailQuery = safeParseString(email);
      const telefoneQuery = safeParseString(telefone);
      const dataNascimentoQuery = safeParseDate(dataNascimento);
      const diaMensalidadeQuery = safeParseInt(diaMensalidade);
      const statusQuery = safeParseString(status) as StatusCliente | undefined;

      const clientes = await this.getAllClientesService.execute(page, limitNumber, {
        nome: nomeQuery,
        email: emailQuery,
        telefone: telefoneQuery,
        dataNascimento: dataNascimentoQuery,
        diaMensalidade: diaMensalidadeQuery,
        status: statusQuery,
      });

      res.status(200).json(clientes);
    } catch (error) {
      next(error);
    }
  }
}
