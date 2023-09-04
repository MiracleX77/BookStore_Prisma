/*
  Warnings:

  - Added the required column `contact_name` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_phone` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "contact_name" VARCHAR(45) NOT NULL,
ADD COLUMN     "contact_phone" VARCHAR(12) NOT NULL,
ADD COLUMN     "email" VARCHAR(100) NOT NULL;
