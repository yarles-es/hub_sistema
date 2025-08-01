/*
  Warnings:

  - The values [VENCIDO] on the enum `StatusMensalidade` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusMensalidade_new" AS ENUM ('PENDENTE', 'PAGO', 'CANCELADO');
ALTER TABLE "mensalidades" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "mensalidades" ALTER COLUMN "status" TYPE "StatusMensalidade_new" USING ("status"::text::"StatusMensalidade_new");
ALTER TYPE "StatusMensalidade" RENAME TO "StatusMensalidade_old";
ALTER TYPE "StatusMensalidade_new" RENAME TO "StatusMensalidade";
DROP TYPE "StatusMensalidade_old";
ALTER TABLE "mensalidades" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
COMMIT;
