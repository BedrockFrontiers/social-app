/*
  Warnings:

  - A unique constraint covering the columns `[gid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_gid_key" ON "User"("gid");
