/*
  Warnings:

  - A unique constraint covering the columns `[catraca_id]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clientes_catraca_id_key" ON "clientes"("catraca_id");
