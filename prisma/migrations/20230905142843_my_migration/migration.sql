/*
  Warnings:

  - A unique constraint covering the columns `[delivery_return_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "delivery_return_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Order_delivery_return_id_key" ON "Order"("delivery_return_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_delivery_return_id_fkey" FOREIGN KEY ("delivery_return_id") REFERENCES "Delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;
