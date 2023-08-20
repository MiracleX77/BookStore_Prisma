/*
  Warnings:

  - The `create_at` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `update_at` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "create_at",
ADD COLUMN     "create_at" TIMETZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "update_at",
ADD COLUMN     "update_at" TIMETZ(3) NOT NULL;
