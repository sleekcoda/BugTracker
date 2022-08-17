/*
  Warnings:

  - The values [UNASSIGNED,ASSIGNED] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [STORY,STORY_POINT] on the enum `TicketType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatus_new" AS ENUM ('NEW', 'OPEN', 'IN_PROGRESS', 'RESOLVED');
ALTER TABLE "tickets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tickets" ALTER COLUMN "status" TYPE "TicketStatus_new" USING ("status"::text::"TicketStatus_new");
ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "TicketStatus_old";
ALTER TABLE "tickets" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TicketType_new" AS ENUM ('BUG', 'SUPPORT', 'FEATURE', 'OTHERS');
ALTER TABLE "tickets" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "tickets" ALTER COLUMN "type" TYPE "TicketType_new" USING ("type"::text::"TicketType_new");
ALTER TYPE "TicketType" RENAME TO "TicketType_old";
ALTER TYPE "TicketType_new" RENAME TO "TicketType";
DROP TYPE "TicketType_old";
ALTER TABLE "tickets" ALTER COLUMN "type" SET DEFAULT 'SUPPORT';
COMMIT;

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "status" SET DEFAULT 'NEW';
