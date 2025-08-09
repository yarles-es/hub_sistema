-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "CadastroBiometriaId" INTEGER;

-- CreateTable
CREATE TABLE "CadastroBiometria" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "id_catraca" INTEGER NOT NULL,
    "primeira_etapa" BOOLEAN NOT NULL DEFAULT false,
    "segunda_etapa" BOOLEAN NOT NULL DEFAULT false,
    "terceira_etapa" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CadastroBiometria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CadastroBiometria_cliente_id_key" ON "CadastroBiometria"("cliente_id");

-- AddForeignKey
ALTER TABLE "CadastroBiometria" ADD CONSTRAINT "CadastroBiometria_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
