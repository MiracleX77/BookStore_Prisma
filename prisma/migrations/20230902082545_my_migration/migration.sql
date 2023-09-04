/*
  Warnings:

  - Added the required column `type_delivery` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "type_delivery" VARCHAR(45) NOT NULL;
