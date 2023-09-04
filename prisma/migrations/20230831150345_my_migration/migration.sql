/*
  Warnings:

  - You are about to drop the column `traking_number` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `tracking_number` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "traking_number",
ADD COLUMN     "tracking_number" VARCHAR(45) NOT NULL;
