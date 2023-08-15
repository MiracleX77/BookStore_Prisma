/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `surname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "password" VARCHAR(45),
ADD COLUMN     "phone" VARCHAR(12),
ADD COLUMN     "status" VARCHAR(45) NOT NULL DEFAULT 'active',
ADD COLUMN     "update_at" TIMESTAMP(3),
ADD COLUMN     "update_by" INTEGER,
ADD COLUMN     "username" VARCHAR(45),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "surname" SET DATA TYPE VARCHAR(45),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(45),
    "password" VARCHAR(45),
    "name" VARCHAR(45),
    "surname" VARCHAR(45),
    "phone" VARCHAR(12),
    "email" VARCHAR(100),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "status" VARCHAR(45) NOT NULL DEFAULT 'active',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
