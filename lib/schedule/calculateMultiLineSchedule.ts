import { ParsedOrder } from "@/types/ParsedOrder";
import { productivityMap } from "@/lib/mappings/productivityMap";

export interface ScheduledOrder extends ParsedOrder {
  start: number;
  end: number;
  people: number;
  productivity: number;
  time: number;
}

export function calculateMultiLineSchedule(
  orders: ParsedOrder[],
  personnelConfig: Record<string, number>,
  startTimeConfig: Record<string, number[]>,
  priorityMap: Record<string, string[]> = {},
  showDowntime = false
): ScheduledOrder[] {
  const schedules: ScheduledOrder[] = [];
  console.log(priorityMap)

  const lineTimes: Record<string, number[]> = {};
  for (const dept in startTimeConfig) {
    lineTimes[dept] = [...startTimeConfig[dept]];
  }

  for (const order of orders) {
    const dept = order.department;
    const line = order.line ?? 0;
    const batch = order.batchName;

    const key = `${dept}${line + 1}`;
    const people = order.people ?? personnelConfig[key] ?? 1;

    // 部門とバッチ名に基づいて productivity を自動取得（無ければ1）
    const prodMap = productivityMap[dept] ?? {};
    const productivity = order.productivity ?? prodMap[batch] ?? 1;

    const pieces = order.pieces ?? 0;

    const time =
      pieces && people && productivity
        ? +(pieces / (people * productivity)).toFixed(2)
        : 0;

    let start = lineTimes[dept]?.[line] ?? 9;

    // オプション: 稼働停止時間考慮（例：17:00〜18:00）
    if (showDowntime && start < 18 && start + time > 17) {
      const overlap = Math.max(0, 18 - Math.max(start, 17));
      start += overlap; // または end を調整する方法も可
    }

    const end = +(start + time).toFixed(2);

    schedules.push({
      ...order,
      people,
      productivity,
      time,
      start,
      end,
    });

    if (lineTimes[dept]) {
      lineTimes[dept][line] = end;
    }
  }

  return schedules;
}