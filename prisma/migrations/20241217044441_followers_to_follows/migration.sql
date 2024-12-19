/*
  Warnings:

  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followedById_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followingId_fkey";

-- DropTable
DROP TABLE "Follower";

-- CreateTable
CREATE TABLE "Followes" (
    "followedById" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Followes_pkey" PRIMARY KEY ("followingId","followedById")
);

-- AddForeignKey
ALTER TABLE "Followes" ADD CONSTRAINT "Followes_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followes" ADD CONSTRAINT "Followes_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
