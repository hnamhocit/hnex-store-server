/*
  Warnings:

  - You are about to drop the column `imageIds` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "postId" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageIds";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
