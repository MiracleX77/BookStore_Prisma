-- AlterTable
ALTER TABLE "District" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "District_id_seq";

-- AlterTable
ALTER TABLE "Provinces" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Provinces_id_seq";

-- AlterTable
ALTER TABLE "SubDistrict" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "SubDistrict_id_seq";
