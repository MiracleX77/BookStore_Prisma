-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_address_id_fkey";

-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "address_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
