import { CatracaInfo } from '@prisma/client';
import { CatracaInfoModel } from '../../models/catraca-info.model';
import { Service } from 'typedi';

@Service()
export class CatracaInfoService {
  constructor(private readonly catracaInfoModel: CatracaInfoModel) {}

  public async getCatracaInfo() {
    return this.catracaInfoModel.getCatracaInfo();
  }

  public async updateCatracaInfo(data: Partial<CatracaInfo>) {
    return this.catracaInfoModel.updateCatracaInfo(data);
  }
}
