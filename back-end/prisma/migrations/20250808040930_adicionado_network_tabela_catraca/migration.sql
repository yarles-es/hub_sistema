/*
  Warnings:

  - Added the required column `network_name` to the `catracas_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catracas_info" ADD COLUMN     "network_name" TEXT NOT NULL;
