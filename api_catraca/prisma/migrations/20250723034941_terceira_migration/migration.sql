/*
  Warnings:

  - Added the required column `catraca_id` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "catraca_id" TEXT NOT NULL;
