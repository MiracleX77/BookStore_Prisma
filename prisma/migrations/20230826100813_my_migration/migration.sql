/*
  Warnings:

  - You are about to drop the column `connt_day` on the `CostRent` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `CostRent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CostRent" DROP COLUMN "connt_day",
DROP COLUMN "cost",
ADD COLUMN     "cost_base" DOUBLE PRECISION,
ADD COLUMN     "cost_per_day" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "count_rent" INTEGER DEFAULT 0;
