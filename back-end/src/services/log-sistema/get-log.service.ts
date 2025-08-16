import { Service } from 'typedi';
import { LogSistemaService } from './@log-sistema.service';
import { GetLog, GetLogResponse, GetLogResponseWithPagination } from '../../types/log-sistema.types';

@Service()
export class GetlogService {
  constructor(private readonly logSistemaService: LogSistemaService) {}

  public async execute(
    page: number,
    limitNumber: number,
    data?: GetLog,
  ): Promise<GetLogResponseWithPagination> {
    const result = await this.logSistemaService.getLogs(page, limitNumber, data);
    const transformData: GetLogResponse[] = result.data.map((log) => {
      return {
        id: log.id,
        acao: log.acao,
        dataHora: log.dataHora,
        usuarioId: log.usuarioId,
        nomeUsuario: log.usuario.nome,
        clienteId: log.clienteId ? log.clienteId : undefined,
        nomeCliente: log.cliente?.nome,
      };
    });

    return {
      data: transformData,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }
}
