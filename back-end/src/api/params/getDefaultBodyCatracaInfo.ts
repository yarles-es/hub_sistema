import Container from 'typedi';
import { CatracaInfoService } from '../../services/catraca/@catraca-info.service';

const service = Container.get<CatracaInfoService>(CatracaInfoService);

export const getDefaultBodyCatracaInfo = async (network?: boolean) => {
  const catracaInfo = await service.getCatracaInfo();

  if (!catracaInfo) {
    throw new Error('Informação da catraca não encontrada');
  }

  const response: {
    id: number;
    ip: string;
    port: number;
    type: number | null;
    network?: string;
  } = {
    id: catracaInfo.id,
    ip: catracaInfo.ip,
    port: catracaInfo.porta,
    type: catracaInfo.tipo,
  };

  if (network) {
    response.network = catracaInfo.networkName;
  }

  return response;
};
