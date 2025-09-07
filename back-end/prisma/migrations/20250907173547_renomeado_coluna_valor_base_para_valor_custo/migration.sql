/*
  Warnings:

  - You are about to drop the column `valor_base` on the `vendas_produtos` table. All the data in the column will be lost.
  - Added the required column `valor_custo` to the `vendas_produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendas_produtos" DROP COLUMN "valor_base",
ADD COLUMN     "valor_custo" DOUBLE PRECISION NOT NULL;
