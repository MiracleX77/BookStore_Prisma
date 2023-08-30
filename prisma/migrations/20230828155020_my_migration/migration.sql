/*
  Warnings:

  - Made the column `img_url_l` on table `ImgDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_url_m` on table `ImgDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_url_s` on table `ImgDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ImgDetail" ALTER COLUMN "img_url_l" SET NOT NULL,
ALTER COLUMN "img_url_m" SET NOT NULL,
ALTER COLUMN "img_url_s" SET NOT NULL;
