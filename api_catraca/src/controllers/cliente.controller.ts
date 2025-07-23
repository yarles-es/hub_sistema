import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateClienteService } from '../services/cliente/create-cliente.service';
import { GetClienteByEmailService } from '../services/cliente/get-cliente-by-email.service';
import { GetClienteByIdService } from '../services/cliente/get-cliente-by-id.service';
import { UpdateClienteService } from '../services/cliente/update-cliente.service';

@Service()
export class ClienteController {
  constructor(
    private readonly createClienteService: CreateClienteService,
    private readonly getClienteByIdService: GetClienteByIdService,
    private readonly getClienteByEmailService: GetClienteByEmailService,
    private readonly updateClienteService: UpdateClienteService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cliente = await this.createClienteService.execute(req.body);
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
      const cliente = await this.getClienteByEmailService.execute(req.query.email as string);
      res.status(200).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedCliente = await this.updateClienteService.execute(Number(req.params.id), req.body);
      res.status(200).json(updatedCliente);
    } catch (error) {
      next(error);
    }
  }
}
