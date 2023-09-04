/*
  Warnings:

  - Made the column `img_id` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_img_id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "img_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
