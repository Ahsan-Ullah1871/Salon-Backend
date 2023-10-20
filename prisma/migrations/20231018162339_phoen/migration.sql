/*
  Warnings:

  - A unique constraint covering the columns `[national_id]` on the table `workers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "workers" ALTER COLUMN "national_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "workers_national_id_key" ON "workers"("national_id");
