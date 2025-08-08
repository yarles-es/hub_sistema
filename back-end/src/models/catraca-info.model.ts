import { CatracaInfo, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class CatracaInfoModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getCatracaInfo() {
    return this.prisma.catracaInfo.findFirst();
  }

  public async updateCatracaInfo(data: Partial<CatracaInfo>) {
    const existing = await this.prisma.catracaInfo.findFirst();
    if (!existing) return;

    return this.prisma.catracaInfo.update({
      where: { id: existing.id },
      data,
    });
  }
}
