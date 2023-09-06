/*
  Warnings:

  - You are about to drop the column `date_receive` on the `Rental` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "date_receive",
ADD COLUMN     "date_admin_receive" TIMESTAMP(3),
ADD COLUMN     "date_user_receive" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "service_cost" DOUBLE PRECISION;
