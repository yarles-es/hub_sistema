-- CreateEnum
CREATE TYPE "TipoCatraca" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateEnum
CREATE TYPE "StatusMensalidade" AS ENUM ('PENDENTE', 'PAGO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "FormPagamento" AS ENUM ('DINHEIRO', 'CARTAO', 'PIX', 'GRATIS');

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "data_nascimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_mensalidade" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catraca_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plano_id" INTEGER NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "administrador" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "mensalidades" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "status" "StatusMensalidade" NOT NULL DEFAULT 'PENDENTE',
    "forma_pagamento" "FormPagamento",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mensalidades_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "registros_acesso" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "tipo_catraca" "TipoCatraca" NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_acesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_sistema" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "acao" TEXT NOT NULL,
    "cliente_id" INTEGER,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensalidades" ADD CONSTRAINT "mensalidades_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_acesso" ADD CONSTRAINT "registros_acesso_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_sistema" ADD CONSTRAINT "logs_sistema_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_sistema" ADD CONSTRAINT "logs_sistema_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
