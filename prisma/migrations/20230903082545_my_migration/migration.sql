/*
  Warnings:

  - Made the column `img_id` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_img_id_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "img_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
