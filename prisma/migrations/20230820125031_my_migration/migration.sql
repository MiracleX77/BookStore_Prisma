/*
  Warnings:

  - You are about to drop the column `sub_district` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "sub_district",
ADD COLUMN     "district_id" INTEGER,
ADD COLUMN     "province_id" INTEGER,
ADD COLUMN     "sub_district_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_sub_district_id_fkey" FOREIGN KEY ("sub_district_id") REFERENCES "SubDistrict"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
