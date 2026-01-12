-- CreateEnum
CREATE TYPE "TipoPlano" AS ENUM ('MENSAL', 'SEMANAL', 'QUINZENAL');

-- AlterTable
ALTER TABLE "planos" ADD COLUMN     "periodo" "TipoPlano" NOT NULL DEFAULT 'MENSAL';
