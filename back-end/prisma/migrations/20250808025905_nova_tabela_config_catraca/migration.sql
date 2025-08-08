-- CreateTable
CREATE TABLE "catracas_info" (
    "id" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "porta" INTEGER NOT NULL,
    "tipo" INTEGER,
    "conectado" BOOLEAN NOT NULL DEFAULT false,
    "conexao_manual" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "catracas_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catracas_info_ip_key" ON "catracas_info"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "catracas_info_porta_key" ON "catracas_info"("porta");
