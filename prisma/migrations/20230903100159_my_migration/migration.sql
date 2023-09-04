/*
  Warnings:

  - A unique constraint covering the columns `[img_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "img_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_img_id_key" ON "Transaction"("img_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE SET NULL ON UPDATE CASCADE;
