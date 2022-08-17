/*
  Warnings:

  - Made the column `authorId` on table `tickets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_authorId_fkey";

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
