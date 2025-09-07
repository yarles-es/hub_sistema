/*
  Warnings:

  - You are about to drop the column `valor` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `valor_venda` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "valor",
ADD COLUMN     "valor_venda" DOUBLE PRECISION NOT NULL;
