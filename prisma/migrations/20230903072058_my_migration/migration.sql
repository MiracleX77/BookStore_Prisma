/*
  Warnings:

  - Made the column `district_id` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province_id` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sub_district_id` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_sub_district_id_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "district_id" SET NOT NULL,
ALTER COLUMN "province_id" SET NOT NULL,
ALTER COLUMN "sub_district_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_sub_district_id_fkey" FOREIGN KEY ("sub_district_id") REFERENCES "SubDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
