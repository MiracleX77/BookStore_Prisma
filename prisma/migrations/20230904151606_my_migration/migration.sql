/*
  Warnings:

  - You are about to drop the column `img_type` on the `ImgDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Img" ADD COLUMN     "img_type" VARCHAR(45);

-- AlterTable
ALTER TABLE "ImgDetail" DROP COLUMN "img_type";
