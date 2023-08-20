/*
  Warnings:

  - You are about to drop the column `update_at + interval '7 hours'` on the `User` table. All the data in the column will be lost.
  - Made the column `update_at` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `update_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "update_at" SET NOT NULL,
ALTER COLUMN "update_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "update_at + interval '7 hours'",
ADD COLUMN     "update_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "create_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMPTZ(3);
