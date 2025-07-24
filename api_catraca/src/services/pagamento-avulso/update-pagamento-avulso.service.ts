import { FormPagamento } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { UpdatePagamentoAvulso } from '../../types/pagamento-avulso.types';
import { PagamentoAvulsoService } from './@pagamento-avulso.service';

@Service()
export class UpdatePagamentoAvulsoService {
  constructor(private readonly pagamentoAvulsoService: PagamentoAvulsoService) {}

  async execute(id: number, data: UpdatePagamentoAvulso) {
    this.validate(id, data);
    return this.pagamentoAvulsoService.updatePagamentoAvulso(id, data);
  }

  private validate(id: number, data: UpdatePagamentoAvulso): void {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido');
    }

    const { formaPagamento, nomeCliente, observacao, valor } = data;

    if (formaPagamento && FormPagamento[formaPagamento] === undefined) {
      throw new BadRequestError('Forma de pagamento inválida');
    }

    if (nomeCliente && nomeCliente.trim() === '') {
      throw new BadRequestError('Nome do cliente está inválido');
    }

    if (observacao && observacao.trim() === '') {
      throw new BadRequestError('Observação está inválida');
    }

    if (valor !== undefined && (valor <= 0 || isNaN(valor))) {
      throw new BadRequestError('Valor deve ser um número válido maior que zero');
    }
  }
}
