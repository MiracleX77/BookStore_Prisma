/*
  Warnings:

  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" VARCHAR(45) NOT NULL,
ADD COLUMN     "create_by" INTEGER,
ADD COLUMN     "update_by" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
