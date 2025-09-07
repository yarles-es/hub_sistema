/*
  Warnings:

  - Added the required column `valor_custo` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "valor_custo" DOUBLE PRECISION NOT NULL;
