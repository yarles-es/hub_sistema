/*
  Warnings:

  - The `catraca_id` column on the `clientes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "catraca_id",
ADD COLUMN     "catraca_id" INTEGER;
