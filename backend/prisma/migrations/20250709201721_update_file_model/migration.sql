/*
  Warnings:

  - You are about to drop the column `fileType` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedById` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encoding` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `File` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_workOrderId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileType",
DROP COLUMN "uploadedById",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "encoding" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "folder" TEXT,
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "workOrderId" DROP NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_url_key" ON "File"("url");

-- CreateIndex
CREATE UNIQUE INDEX "File_key_key" ON "File"("key");

-- CreateIndex
CREATE INDEX "File_workOrderId_idx" ON "File"("workOrderId");

-- CreateIndex
CREATE INDEX "File_createdById_idx" ON "File"("createdById");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
