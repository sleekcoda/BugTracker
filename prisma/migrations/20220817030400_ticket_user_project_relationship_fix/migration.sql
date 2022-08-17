/*
  Warnings:

  - You are about to drop the `userTickets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userTickets" DROP CONSTRAINT "userTickets_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "userTickets" DROP CONSTRAINT "userTickets_userId_fkey";

-- DropTable
DROP TABLE "userTickets";

-- CreateTable
CREATE TABLE "TicketAssignee" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TicketAssignee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketAssignee" ADD CONSTRAINT "TicketAssignee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketAssignee" ADD CONSTRAINT "TicketAssignee_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
