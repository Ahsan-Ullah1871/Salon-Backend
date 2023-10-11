-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "bytes" INTEGER NOT NULL,
    "description" TEXT DEFAULT '',

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
