import { ParsedOrder } from "@/types/ParsedOrder";
// import { ScheduledOrder } from "../calculateSchedule";

// ✅ calculateSchedule.ts
export interface ScheduledOrder extends ParsedOrder {
  start: number;
  end: number;
}

export function calculateSchedule(
  orders: ParsedOrder[],
  startTimes: Record<'MAS' | 'DAS' | 'WDA', number>
): ScheduledOrder[] {
  const result: ScheduledOrder[] = [];
  const currentTimeMap = { ...startTimes };

  for (const order of orders) {
    const { department, pieces, people, productivity } = order;
    const start = currentTimeMap[department];
    const duration = pieces / (people * productivity);
    const end = start + duration;

    result.push({ ...order, start, end });
    currentTimeMap[department] = end;
  }

  return result;
}