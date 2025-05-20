import { ParsedOrder } from "@/types/ParsedOrder";
import { ScheduleEntry } from "./schedule";

export function calculateScheduleWithBreaks(
  data: ParsedOrder[],
  priorities: string[],
  startHour = 9,
  endHour = 17
): ScheduleEntry[] {
  if (!Array.isArray(priorities)) {
    console.error("priorities is not an array:", priorities);


    console.log(endHour)
    return [];

  }

  const schedule: ScheduleEntry[] = [];

  // 優先順位に基づいて並べ替え
  const sortedData = [...data].sort((a, b) => {
    const indexA = priorities.indexOf(a.batch ?? "");
    const indexB = priorities.indexOf(b.batch ?? "");
    return indexA - indexB;
  });

  let currentTime = startHour;

  for (const item of sortedData) {
    // const pieces = Number(item.pieces) || 0;
    // const productivity = Number(item.productivity) || 1;
    // const people = Number(item.people) || 1;

    const duration = Number(item.pieces) / Number(item.productivity || 1);
    // 午後休憩（14:45〜15:00）を挟む処理
    if (currentTime < 14.75 && currentTime + duration > 14.75) {
      currentTime = 15.0;
    }

    const endTime = currentTime + duration;

    schedule.push({
  department: item.department,
  category: item.category,
  batch: item.batch,
  start: currentTime,
  end: endTime,
  duration,
  pieces: Number(item.pieces),
  people: Number(item.people),
  productivity: Number(item.productivity),
});

    currentTime = endTime;
  }

  return schedule;
}