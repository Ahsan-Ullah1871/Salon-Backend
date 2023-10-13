/*
  Warnings:

  - You are about to drop the column `is_marrid` on the `workers` table. All the data in the column will be lost.
  - You are about to drop the column `parmanent_address` on the `workers` table. All the data in the column will be lost.
  - Added the required column `permanent_address` to the `workers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workers" DROP COLUMN "is_marrid",
DROP COLUMN "parmanent_address",
ADD COLUMN     "is_married" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "permanent_address" TEXT NOT NULL;
