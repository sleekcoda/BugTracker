/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `tickets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_assignedTo_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "assignedTo";
