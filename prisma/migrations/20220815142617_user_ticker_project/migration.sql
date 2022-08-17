-- CreateTable
CREATE TABLE "userProjects" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "userProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userTickets" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "userTickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userProjects" ADD CONSTRAINT "userProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userProjects" ADD CONSTRAINT "userProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTickets" ADD CONSTRAINT "userTickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTickets" ADD CONSTRAINT "userTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
