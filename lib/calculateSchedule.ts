import { ParsedOrder } from '@/types/ParsedOrder';

const ROUND_UNIT = 0.25; // 15分単位

export type ScheduledOrder = ParsedOrder & {
  start: number;
  end: number;
};

export function calculateSchedule(
  orders: ParsedOrder[],
  departmentStartTime: Record<string, number> // 例: { MAS: 9, DAS: 9.25, WDA: 9.5 }
): ScheduledOrder[] {
  const currentTimeMap: Record<string, number> = { ...departmentStartTime };
  const scheduled: ScheduledOrder[] = [];

  for (const order of orders) {
    const dept = order.department;
    const productivity = order.productivity || 1;
    const people = order.people || 1;
    const pieces = order.pieces || 0;

    const rawHours = pieces / people / productivity;
    const roundedHours = Math.ceil(rawHours / ROUND_UNIT) * ROUND_UNIT;

    const start = currentTimeMap[dept];
    const end = +(start + roundedHours).toFixed(2);

    scheduled.push({
      ...order,
      start,
      end,
    });

    currentTimeMap[dept] = end;
  }

  return scheduled;
}