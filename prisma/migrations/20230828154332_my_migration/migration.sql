/*
  Warnings:

  - You are about to drop the column `img_size` on the `ImgDetail` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `ImgDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImgDetail" DROP COLUMN "img_size",
DROP COLUMN "img_url",
ADD COLUMN     "img_url_l" VARCHAR(500),
ADD COLUMN     "img_url_m" VARCHAR(500),
ADD COLUMN     "img_url_s" VARCHAR(500);
