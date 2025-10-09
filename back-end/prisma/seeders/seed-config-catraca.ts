import 'dotenv/config';
import { PrismaClient, CatracaInfo } from '@prisma/client';

const idCatraca = Number(process.env.ID_CATRACA);
const ipCatraca = process.env.IP_CATRACA as string;
const portaCatraca = Number(process.env.PORTA_CATRACA);
const typeCatraca = Number(process.env.TYPE_CATRACA);
const networkNameCatraca = process.env.NETWORK_NAME_CATRACA as string;

if (!idCatraca || !ipCatraca || !portaCatraca || !typeCatraca || !networkNameCatraca) {
  console.warn('Variáveis de ambiente para configuração da catraca não estão todas definidas.');
  console.warn(
    'Por favor, verifique as variáveis: ID_CATRACA, IP_CATRACA, PORTA_CATRACA, TYPE_CATRACA, NETWORK_NAME_CATRACA',
  );
  process.exit(1);
}

export async function seedCatracaInfo(prisma: PrismaClient) {
  const catracaInfo: CatracaInfo = {
    id: idCatraca,
    ip: ipCatraca,
    porta: portaCatraca,
    tipo: typeCatraca,
    conectado: false,
    conexaoManual: false,
    networkName: networkNameCatraca,
  };

  const exists = await prisma.catracaInfo.findMany();

  if (exists.length > 0) {
    await prisma.catracaInfo.deleteMany();
  }

  await prisma.catracaInfo.upsert({
    where: { id: catracaInfo.id },
    update: {},
    create: catracaInfo,
  });
}
