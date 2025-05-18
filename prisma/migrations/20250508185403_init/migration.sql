-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" TEXT NOT NULL,
    "workDate" TIMESTAMP(3) NOT NULL,
    "department" TEXT NOT NULL,
    "pieces" INTEGER NOT NULL,
    "productivity" DOUBLE PRECISION NOT NULL,
    "people" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);
