/*
  Warnings:

  - Made the column `count_rent` on table `Stock` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "count_rent" SET NOT NULL;
