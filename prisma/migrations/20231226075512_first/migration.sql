/*
  Warnings:

  - You are about to drop the column `product_id` on the `CostRent` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_card` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CostRent" DROP CONSTRAINT "CostRent_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_create_by_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_img_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_update_by_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_product_id_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "id_card" VARCHAR(20) NOT NULL,
ADD COLUMN     "role" VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE "CostRent" DROP COLUMN "product_id",
ADD COLUMN     "book_id" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "type" VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "product_id",
ADD COLUMN     "book_id" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "product_id",
ADD COLUMN     "book_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_author" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION,
    "description" VARCHAR(500),
    "count_rent" INTEGER DEFAULT 0,
    "create_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_by" INTEGER,
    "update_at" TIMESTAMPTZ(3) NOT NULL,
    "update_by" INTEGER,
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',
    "img_id" INTEGER NOT NULL,
    "publisher_id" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookCategory" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_img_id_key" ON "Book"("img_id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "Img"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostRent" ADD CONSTRAINT "CostRent_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategory" ADD CONSTRAINT "BookCategory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategory" ADD CONSTRAINT "BookCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
