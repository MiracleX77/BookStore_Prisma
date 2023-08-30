/*
  Warnings:

  - You are about to drop the column `cost_rent_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cost_rent_id_fkey";

-- DropIndex
DROP INDEX "Product_cost_rent_id_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cost_rent_id";
