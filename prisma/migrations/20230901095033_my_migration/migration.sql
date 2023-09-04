/*
  Warnings:

  - You are about to drop the column `date_recieve` on the `Rental` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "date_recieve",
ADD COLUMN     "date_receive" TIMESTAMP(3);
