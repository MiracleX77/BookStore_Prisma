/*
  Warnings:

  - You are about to drop the column `img_url_after` on the `ImgDetail` table. All the data in the column will be lost.
  - You are about to drop the column `img_url_before` on the `ImgDetail` table. All the data in the column will be lost.
  - Made the column `img_url_l` on table `ImgDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_url_m` on table `ImgDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_url_s` on table `ImgDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ImgDetail" DROP COLUMN "img_url_after",
DROP COLUMN "img_url_before",
ADD COLUMN     "img_type" VARCHAR(45),
ALTER COLUMN "img_url_l" SET NOT NULL,
ALTER COLUMN "img_url_m" SET NOT NULL,
ALTER COLUMN "img_url_s" SET NOT NULL;
