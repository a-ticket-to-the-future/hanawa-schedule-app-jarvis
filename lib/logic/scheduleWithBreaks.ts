import { ParsedOrder } from "@/types/ParsedOrder";
import { ScheduleEntry } from "./schedule";

export function calculateScheduleWithBreaks(
  data: ParsedOrder[],
  priorities: string[],
  startHour = 9,
  endHour = 17
): ScheduleEntry[] {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort((a, b) => {
    const indexA = priorities.indexOf(a.batch ?? "");
    const indexB = priorities.indexOf(b.batch ?? "");
    return indexA - indexB;
  });

  const schedule: ScheduleEntry[] = [];
  let currentTime = startHour;

  for (const item of sortedData) {
    const people = Number(item.people);
    const productivity = Number(item.productivity);
    const pieces = Number(item.pieces);

    if (!people || !productivity) continue;

    const duration = pieces / (people * productivity);
    let endTime = currentTime + duration;

    // 休憩を考慮（例: 14:45 に午後休憩）
    if (currentTime < 14.75 && endTime > 14.75) {
      endTime += 0.25;
    }

    schedule.push({
      department: item.department,
      category: item.category,
      batch: item.batch,
      start: currentTime,
      end: endTime,
      duration,
      pieces,
      people,
      productivity
    });

    currentTime = endTime;
  }

  return schedule;
}