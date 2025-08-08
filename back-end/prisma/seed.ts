import { PrismaClient } from '@prisma/client';
import { seedUsuario } from './seeders/seed-usuario';
import { seedCatracaInfo } from './seeders/seed-config-catraca';

const prisma = new PrismaClient();

async function main() {
  await seedUsuario(prisma);
  await seedCatracaInfo(prisma);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
