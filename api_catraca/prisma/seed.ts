import { PrismaClient } from '@prisma/client';
import { seedUsuario } from './seeders/seed-usuario';

const prisma = new PrismaClient();

async function main() {
  await seedUsuario(prisma);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
