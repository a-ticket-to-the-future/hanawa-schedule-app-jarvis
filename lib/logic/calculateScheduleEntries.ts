// /lib/logic/calculateScheduleEntries.ts
import { ParsedOrder } from "@/types/ParsedOrder";
import { ScheduleEntry } from "@/lib/logic/schedule";
// import { scheduler } from "timers/promises";
import { minutesToTimeString } from "../utils/timeUtils";

// 開始時刻を基準にカテゴリごとの時間を割り当てる
export function calculateScheduleEntries(
  parsed: ParsedOrder[],
  startHour: number,
  endHour: number
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];

  const departmentTimeMap: Record<string, number> = {};
  // let currentHour = startHour;

  for (const entry of parsed) {
    // const duration = Math.ceil(item.pieces / 300 * 4) / 4; // 300pcs/人時、0.25単位
       const {department,category,pieces,people,productivity} = entry;
    // const start = `${Math.floor(currentTime)}:${(currentTime % 1) * 60 === 0 ? "00" : "30"}`;
    // currentTime += duration;
    // const end = `${Math.floor(currentTime)}:${(currentTime % 1) * 60 === 0 ? "00" : "30"}`;

   const currentTime = departmentTimeMap[department] ?? startHour * 60;

    const duration = Math.ceil((pieces / 330) * 60); // 330pcs/人時の仮生産性
    const start = minutesToTimeString(currentTime);
    const end = minutesToTimeString(currentTime + duration);
    
    schedule.push({ department, category, start, end,duration,people,pieces, productivity });

    departmentTimeMap[department] = currentTime + duration;
    
  }
  console.log(endHour)

  return schedule;
}