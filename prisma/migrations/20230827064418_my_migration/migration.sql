/*
  Warnings:

  - A unique constraint covering the columns `[cost_rent_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cost_rent_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Product_cost_rent_id_key" ON "Product"("cost_rent_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cost_rent_id_fkey" FOREIGN KEY ("cost_rent_id") REFERENCES "CostRent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
