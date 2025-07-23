/*
  Warnings:

  - You are about to drop the column `pago` on the `mensalidades` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusMensalidade" AS ENUM ('PENDENTE', 'PAGO', 'CANCELADO');

-- AlterTable
ALTER TABLE "mensalidades" DROP COLUMN "pago",
ADD COLUMN     "forma_pagamento" "FormPagamento",
ADD COLUMN     "status" "StatusMensalidade" NOT NULL DEFAULT 'PENDENTE';
