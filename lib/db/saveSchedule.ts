import { prisma } from '@/lib/db/client'; // PrismaClientの初期化ファイル
import { ParsedOrder } from '@/types/ParsedOrder';

export async function saveSchedule(date: string, data: ParsedOrder[]) {
  const result = await prisma.schedule.upsert({
    where: { date: new Date(date) },
    update: { data, updatedAt: new Date() },
    create: { date: new Date(date), data },
  });
  return result;
}