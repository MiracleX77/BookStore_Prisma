/*
  Warnings:

  - You are about to drop the column `update_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "update_at",
ADD COLUMN     "update_at + interval '7 hours'" TIMESTAMP(3),
ALTER COLUMN "create_at" SET DEFAULT now() at time zone 'Asia/Bangkok';
