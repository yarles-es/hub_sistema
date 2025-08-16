import { Service } from 'typedi';
import { LogSistemaService } from './@log-sistema.service';
import { GetLog } from '../../types/log-sistema.types';

@Service()
export class GetlogService {
  constructor(private readonly logSistemaService: LogSistemaService) {}

  public async execute(page: number, limitNumber: number, data?: GetLog) {
    const result = await this.logSistemaService.getLogs(page, limitNumber, data);
    return result;
  }
}
