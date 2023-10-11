/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'workers', 'customer');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "profile_image" TEXT DEFAULT '',
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'customer',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workers" (
    "id" TEXT NOT NULL,
    "is_authorized" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "is_marrid" BOOLEAN NOT NULL DEFAULT false,
    "phone_number" INTEGER NOT NULL,
    "parmanent_address" TEXT NOT NULL,
    "current_address" TEXT NOT NULL,
    "national_id" INTEGER NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv" (
    "id" TEXT NOT NULL,
    "worker_id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "last_job_info" TEXT NOT NULL DEFAULT '',
    "last_job_salary" INTEGER DEFAULT 0,
    "last_job_review" TEXT DEFAULT '',
    "last_job_leaving_reason" TEXT DEFAULT '',

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT DEFAULT '',

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workers_email_key" ON "workers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workers_phone_number_key" ON "workers"("phone_number");

-- AddForeignKey
ALTER TABLE "workers" ADD CONSTRAINT "workers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
