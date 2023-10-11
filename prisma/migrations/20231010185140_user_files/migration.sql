/*
  Warnings:

  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_user_id_fkey";

-- DropTable
DROP TABLE "files";

-- CreateTable
CREATE TABLE "user_files" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "bytes" INTEGER NOT NULL,
    "description" TEXT DEFAULT '',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_files" ADD CONSTRAINT "user_files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
