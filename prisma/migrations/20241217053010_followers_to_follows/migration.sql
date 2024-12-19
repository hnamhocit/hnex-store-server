/*
  Warnings:

  - You are about to drop the `Followes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Followes" DROP CONSTRAINT "Followes_followedById_fkey";

-- DropForeignKey
ALTER TABLE "Followes" DROP CONSTRAINT "Followes_followingId_fkey";

-- DropTable
DROP TABLE "Followes";

-- CreateTable
CREATE TABLE "Follows" (
    "followedById" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followingId","followedById")
);

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
