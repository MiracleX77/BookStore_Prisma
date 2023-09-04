/*
  Warnings:

  - Made the column `rental_id` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_rental_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "rental_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
