import { PrismaClient, CatracaInfo } from '@prisma/client';

export async function seedCatracaInfo(prisma: PrismaClient) {
  const catracaInfo: CatracaInfo = {
    id: 41,
    ip: '192.168.4.37',
    porta: 7878,
    tipo: 1,
    conectado: false,
    conexaoManual: false,
    networkName: 'eth0',
  };

  await prisma.catracaInfo.upsert({
    where: { id: catracaInfo.id },
    update: {},
    create: catracaInfo,
  });
}
