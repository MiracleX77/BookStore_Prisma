/*
  Warnings:

  - Made the column `img_id` on table `ImgDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ImgDetail" DROP CONSTRAINT "ImgDetail_img_id_fkey";

-- AlterTable
ALTER TABLE "ImgDetail" ALTER COLUMN "img_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ImgDetail" ADD CONSTRAINT "ImgDetail_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
