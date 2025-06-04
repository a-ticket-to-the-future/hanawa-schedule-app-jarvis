// lib/schedule/calculateMultiLineSchedule.ts

import { ParsedOrder } from '@/types/ParsedOrder';

export interface ScheduledOrder extends ParsedOrder {
  start: number;
  end: number;
  people: number;
  productivity: number;
  time: number;
}

const BREAKS = [
  { start: 11.75, end: 12.5 },  // 11:45〜12:30
  { start: 14.75, end: 15 },    // 14:45〜15:00
  { start: 21, end: 21.25 },    // 21:00〜21:15
];

const DOWNTIME = { start: 17, end: 18 };

function adjustForBreaksAndDowntime(start: number, duration: number, showDowntime: boolean): number {
  const current = start;
  let remaining = duration;

  while (remaining > 0) {
    let next = current + remaining;

    // 休憩時間の調整
    for (const brk of BREAKS) {
      if (current < brk.end && next > brk.start) {
        const overlap = Math.min(next, brk.end) - Math.max(current, brk.start);
        remaining += overlap;
        next += overlap;
      }
    }

    // 稼働停止時間の調整
    if (showDowntime && current < DOWNTIME.end && next > DOWNTIME.start) {
      const overlap = Math.min(next, DOWNTIME.end) - Math.max(current, DOWNTIME.start);
      remaining += overlap;
      next += overlap;
    }

    return +next.toFixed(2);
  }

  return +(current + remaining).toFixed(2);
}

export function calculateMultiLineSchedule(
  orders: ParsedOrder[],
  personnelConfig: Record<string, number>,
  startTimeConfig: Record<string, number[]>,
  priorityMap: Record<string, string[]> = {},
  showDowntime = false
): ScheduledOrder[] {
  const schedules: ScheduledOrder[] = [];

  const lineTimes: Record<string, number[]> = {};
  for (const dept in startTimeConfig) {
    lineTimes[dept] = [...startTimeConfig[dept]];
  }

  const sortedOrders = [...orders].sort((a, b) => {
    const aIndex = priorityMap[a.department]?.indexOf(a.batchName) ?? Infinity;
    const bIndex = priorityMap[b.department]?.indexOf(b.batchName) ?? Infinity;
    return aIndex - bIndex;
  });

  for (const order of sortedOrders) {
    const dept = order.department;
    const line = order.line ?? 0;
    const batchName = order.batchName;

    const key = `${dept}${line + 1}`;
    const people = order.people ?? personnelConfig[key] ?? 1;
    const productivity = order.productivity ?? 1;
    const pieces = order.pieces ?? 0;

    const time = pieces && people && productivity
      ? +(pieces / (people * productivity)).toFixed(2)
      : 0;

    const start = lineTimes[dept]?.[line] ?? 9;
    const end = adjustForBreaksAndDowntime(start, time, showDowntime);

    schedules.push({
      ...order,
      people,
      productivity,
      time,
      start,
      end,
      batchName,
    });

    if (lineTimes[dept]) {
      lineTimes[dept][line] = end;
    }
  }

  return schedules;
}