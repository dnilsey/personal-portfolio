/*
  Warnings:

  - A unique constraint covering the columns `[storagePath]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "storagePath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "images_storagePath_key" ON "images"("storagePath");
