/*
  Warnings:

  - You are about to drop the column `provider_id` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_provider_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "provider_id";
