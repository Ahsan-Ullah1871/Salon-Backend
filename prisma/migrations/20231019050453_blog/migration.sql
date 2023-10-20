/*
  Warnings:

  - Added the required column `image_id` to the `blog_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `blog_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "image_id" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;
