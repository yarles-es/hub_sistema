/*
  Warnings:

  - You are about to drop the column `forma_pagamento` on the `registros_acesso` table. All the data in the column will be lost.
  - You are about to drop the column `valor_pago` on the `registros_acesso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "registros_acesso" DROP COLUMN "forma_pagamento",
DROP COLUMN "valor_pago";

-- CreateTable
CREATE TABLE "planos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos_avulsos" (
    "id" SERIAL NOT NULL,
    "nome_cliente" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "forma_pagamento" "FormPagamento" NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagamentos_avulsos_pkey" PRIMARY KEY ("id")
);
