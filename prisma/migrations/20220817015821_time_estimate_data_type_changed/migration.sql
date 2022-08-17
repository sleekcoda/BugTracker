/*
  Warnings:

  - The `timeEstimate` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "timeEstimate",
ADD COLUMN     "timeEstimate" INTEGER DEFAULT 0;
