import { ParsedOrder } from "@/types/ParsedOrder";

export interface ScheduledOrder extends ParsedOrder {
  start: number;
  end: number;
}

export function calculateMultiLineSchedule(
  orders: ParsedOrder[],
  personnelConfig: Record<string, number>,
  startTimeConfig: Record<string, number[]>
): ScheduledOrder[] {
  const schedules: ScheduledOrder[] = [];

  // 各部門のラインごとの現在の時間を初期化
  const lineTimes: Record<string, number[]> = {};
  for (const dept in startTimeConfig) {
    lineTimes[dept] = [...startTimeConfig[dept]];
  }

  for (const order of orders) {
    const dept = order.department;
    const line = order.line ?? 0;

    const pieces = order.pieces ?? 0;

    // 部署+ライン番号 例: "DAS1", "DAS2"
    const key = `${dept}${line + 1}`;
    const people = order.people ?? personnelConfig[key] ?? 1;
    const productivity = order.productivity ?? 1;

    const time =
      pieces && people && productivity
        ? +(pieces / (people * productivity)).toFixed(2)
        : 0;

    const start = lineTimes[dept]?.[line] ?? 9;
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