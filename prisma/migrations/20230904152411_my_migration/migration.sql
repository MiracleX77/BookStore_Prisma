/*
  Warnings:

  - You are about to drop the column `img_id` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[img_before_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[img_after_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_img_id_fkey";

-- DropIndex
DROP INDEX "Transaction_img_id_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "img_id",
ADD COLUMN     "img_after_id" INTEGER,
ADD COLUMN     "img_before_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_img_before_id_key" ON "Transaction"("img_before_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_img_after_id_key" ON "Transaction"("img_after_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_img_before_id_fkey" FOREIGN KEY ("img_before_id") REFERENCES "Img"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_img_after_id_fkey" FOREIGN KEY ("img_after_id") REFERENCES "Img"("id") ON DELETE SET NULL ON UPDATE CASCADE;
