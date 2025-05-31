import { ParsedOrder } from "@/types/ParsedOrder";
// import { ScheduledOrder } from "../calculateSchedule";

// ✅ calculateSchedule.ts
export interface ScheduledOrder extends ParsedOrder {
  start: number;
  end: number;
}

// lib/schedule/calculateSchedule.ts
export function calculateSchedule(
  orders: ParsedOrder[],
  startTimes: Record<'MAS' | 'DAS' | 'WDA', number>
): ScheduledOrder[] {
  const schedules: ScheduledOrder[] = [];
  const currentTime = { ...startTimes };

  for (const order of orders) {
    const { department, pieces, people, productivity } = order;

    const duration = (pieces && people && productivity)
      ? +(pieces / (people * productivity)).toFixed(2)
      : 0;

    const start = currentTime[department];
    const end = +(start + duration).toFixed(2);

    schedules.push({ ...order, start, end });
    currentTime[department] = end;
  }

  return schedules;
}