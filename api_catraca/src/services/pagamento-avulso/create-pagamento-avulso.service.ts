import { FormPagamento } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { CreatePagamentoAvulso } from '../../types/pagamento-avulso.types';
import { PagamentoAvulsoService } from './@pagamento-avulso.service';

@Service()
export class CreatePagamentoAvulsoService {
  constructor(private readonly pagamentoAvulsoService: PagamentoAvulsoService) {}

  async execute(data: CreatePagamentoAvulso) {
    this.validate(data);
    return this.pagamentoAvulsoService.createPagamentoAvulso(data);
  }

  private validate(data: CreatePagamentoAvulso): void {
    const { formaPagamento, nomeCliente, observacao, valor } = data;

    if (!formaPagamento || FormPagamento[formaPagamento] === undefined) {
      throw new BadRequestError('Forma de pagamento inválida');
    }

    if (nomeCliente && nomeCliente.trim() === '') {
      throw new BadRequestError('Nome do cliente está inválido');
    }

    if (observacao && observacao.trim() === '') {
      throw new BadRequestError('Observação está inválida');
    }

    if (valor === undefined || valor <= 0 || isNaN(valor)) {
      throw new BadRequestError('Valor deve ser um número válido maior que zero');
    }
  }
}
