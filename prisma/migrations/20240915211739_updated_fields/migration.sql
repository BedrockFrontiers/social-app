/*
  Warnings:

  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Repost` table. All the data in the column will be lost.
  - Added the required column `userIdentifier` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorIdentifier` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdentifier` to the `Repost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Repost" DROP CONSTRAINT "Repost_userId_fkey";

-- AlterTable
ALTER TABLE "Follower" ALTER COLUMN "followingId" SET DATA TYPE TEXT,
ALTER COLUMN "followerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "userId",
ADD COLUMN     "userIdentifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ADD COLUMN     "authorIdentifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Repost" DROP COLUMN "userId",
ADD COLUMN     "userIdentifier" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorIdentifier_fkey" FOREIGN KEY ("authorIdentifier") REFERENCES "User"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userIdentifier_fkey" FOREIGN KEY ("userIdentifier") REFERENCES "User"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repost" ADD CONSTRAINT "Repost_userIdentifier_fkey" FOREIGN KEY ("userIdentifier") REFERENCES "User"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;
