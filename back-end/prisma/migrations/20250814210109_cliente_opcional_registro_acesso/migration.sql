/*
  Warnings:

  - Made the column `cliente_id` on table `CadastroBiometria` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CadastroBiometria" DROP CONSTRAINT "CadastroBiometria_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "registros_acesso" DROP CONSTRAINT "registros_acesso_cliente_id_fkey";

-- AlterTable
ALTER TABLE "CadastroBiometria" ALTER COLUMN "cliente_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "registros_acesso" ALTER COLUMN "cliente_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "registros_acesso" ADD CONSTRAINT "registros_acesso_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CadastroBiometria" ADD CONSTRAINT "CadastroBiometria_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
