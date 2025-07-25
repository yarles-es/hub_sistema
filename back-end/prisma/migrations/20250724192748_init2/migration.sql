/*
  Warnings:

  - You are about to drop the column `data_mensalidade` on the `clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "data_mensalidade",
ADD COLUMN     "dia_mensalidade" INTEGER;
