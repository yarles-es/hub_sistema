-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TipoPlano" ADD VALUE 'SEMESTRAL';
ALTER TYPE "TipoPlano" ADD VALUE 'ANUAL';

-- AlterTable
ALTER TABLE "planos" ADD COLUMN     "dias_validos" INTEGER,
ADD COLUMN     "validar_dias" BOOLEAN NOT NULL DEFAULT false;
