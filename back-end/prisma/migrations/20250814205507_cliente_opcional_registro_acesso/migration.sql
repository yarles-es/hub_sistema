-- DropForeignKey
ALTER TABLE "CadastroBiometria" DROP CONSTRAINT "CadastroBiometria_cliente_id_fkey";

-- AlterTable
ALTER TABLE "CadastroBiometria" ALTER COLUMN "cliente_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CadastroBiometria" ADD CONSTRAINT "CadastroBiometria_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
