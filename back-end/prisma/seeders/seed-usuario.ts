import { PrismaClient, Usuario } from '@prisma/client';
import { generateHashBcrypt } from '../../src/utils/bcrypt';

export async function seedUsuario(prisma: PrismaClient) {
  const usuario: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'> = {
    nome: 'Administrador',
    email: 'admin@example.com',
    senha: await generateHashBcrypt('admin123'),
    ativo: true,
    administrador: true,
  };

  await prisma.usuario.create({
    data: usuario,
  });
}
