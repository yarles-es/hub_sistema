-- AlterEnum
ALTER TYPE "StatusMensalidade" ADD VALUE 'VENCIDO';

-- AlterTable
ALTER TABLE "mensalidades" ADD COLUMN     "data_pagamento" TIMESTAMP(3),
ADD COLUMN     "valor_pago" DOUBLE PRECISION;
