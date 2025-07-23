import { LogSistema } from '@prisma/client';
import { Service } from 'typedi';
import { LogSistemaService } from './@log-sistema.service';

@Service()
export class GetlogService {
  constructor(private readonly logSistemaService: LogSistemaService) {}

  public async execute(): Promise<LogSistema[]> {
    const result = await this.logSistemaService.getLogs();
    return result;
  }
}
