/*
  Warnings:

  - You are about to drop the column `plano_id` on the `mensalidades` table. All the data in the column will be lost.
  - Added the required column `plano_id` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "mensalidades" DROP CONSTRAINT "mensalidades_plano_id_fkey";

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "plano_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "mensalidades" DROP COLUMN "plano_id";

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
