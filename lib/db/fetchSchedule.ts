import { ParsedOrder } from "@/types/ParsedOrder";
import { prisma } from "@/lib/db/client";

export async function fetchSchedule(date: string): Promise<ParsedOrder[] | null> {
  const result = await prisma.schedule.findUnique({
    where: { date: new Date(date) },
  });
  return result?.data ?? null;
}