// lib/schedule/calculateSchedule.ts
import { ParsedOrder } from '@/types/schedule';
import { productivityMap } from '@/lib/mappings/productivityMap';

const ROUND_UNIT = 0.25; // 15分単位

export type ScheduledOrder = ParsedOrder & {
  start: number; // 例: 9.0 = 9:00
  end: number;   // 小数表記
};

export function calculateSchedule(
  orders: ParsedOrder[],
  departmentPersonnel: Record<string, number>,
  workStartTime = 9
): ScheduledOrder[] {
  let currentTime = workStartTime;
  const scheduled: ScheduledOrder[] = [];

  for (const order of orders) {
    const productivity = productivityMap[order.department]?.[order.batchName] ?? 250;
    const personnel = departmentPersonnel[order.department] ?? 1;
    const rawHours = order.pieces / productivity / personnel;

    const roundedHours = Math.ceil(rawHours / ROUND_UNIT) * ROUND_UNIT;
    const start = currentTime;
    const end = start + roundedHours;

    scheduled.push({ ...order, start, end });
    currentTime = end;
  }

  return scheduled;
}
