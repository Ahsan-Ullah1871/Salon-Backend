/*
  Warnings:

  - You are about to drop the column `is_reviwed` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "is_reviwed",
ADD COLUMN     "is_reviewed" BOOLEAN NOT NULL DEFAULT false;
