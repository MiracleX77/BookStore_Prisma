-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_delivery_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "delivery_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "Delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;
