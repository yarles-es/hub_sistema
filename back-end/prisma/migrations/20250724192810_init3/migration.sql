/*
  Warnings:

  - Made the column `dia_mensalidade` on table `clientes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "dia_mensalidade" SET NOT NULL;
