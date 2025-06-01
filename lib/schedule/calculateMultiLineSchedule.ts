
import { ParsedOrder } from '@/types/ParsedOrder';

export type ScheduledOrder = ParsedOrder & {
  start: number;
  end: number;
  line: number; // 使用されたライン番号（0, 1 など）
};

type LineConfig = Record<'MAS' | 'DAS' | 'WDA', number>; // 例: { MAS: 1, DAS: 2, WDA: 1 }
type StartTimeConfig = Record<'MAS' | 'DAS' | 'WDA', number[]>; // 各ラインごとの開始時刻

type LineState = Record<'MAS' | 'DAS' | 'WDA', number[]>;

const ROUND_UNIT = 0.25;

function applyBreaks(start: number, duration: number): number {
  const breaks = [
    { start: 11.75, end: 12.5 },
    { start: 14.75, end: 15.0 },
    { start: 21.0, end: 21.25 }
  ];

  let end = start + duration;

  for (const brk of breaks) {
    if (start < brk.start && end > brk.start) {
      end += brk.end - brk.start;
    }
  }

  return end;
}

export function calculateMultiLineSchedule(
  orders: ParsedOrder[],
  lineConfig: LineConfig,
  startTimeConfig: StartTimeConfig
): ScheduledOrder[] {
  const lineTimes: LineState = {} as LineState;

  // 各部署ごとのライン数と開始時刻を初期化
  for (const dept of Object.keys(lineConfig) as (keyof LineConfig)[]) {
    const lineCount = lineConfig[dept];
    const times = startTimeConfig[dept] || [];
    lineTimes[dept] = Array(lineCount).fill(0).map((_, i) => times[i] ?? 9); // default 9:00
  }

  const scheduled: ScheduledOrder[] = [];

  for (const order of orders) {
    const dept = order.department;
    const lines = lineTimes[dept];
    if (!lines) continue;

    const people = order.people || 1;
    const productivity = order.productivity || 1;
    const pieces = order.pieces || 0;

    const rawTime = pieces / people / productivity;
    const roundedTime = Math.ceil(rawTime / ROUND_UNIT) * ROUND_UNIT;

    // 最も早く空くラインを選択
    const earliestLine = lines.reduce((minIndex, currTime, idx, arr) =>
      currTime < arr[minIndex] ? idx : minIndex, 0);

    const start = lines[earliestLine];
    const end = applyBreaks(start, roundedTime);

    scheduled.push({
      ...order,
      start,
      end,
      line: earliestLine
    });

    // ラインの終了時間を更新
    lines[earliestLine] = end;
  }

  return scheduled;
}



// import { ParsedOrder } from "@/types/ParsedOrder";

// export interface ScheduledOrder extends ParsedOrder {
//   start: number;
//   end: number;
//   line: number;
// }

// const ROUND_UNIT = 0.25;

// type LineState = Record<string, number[]>;

// export function calculateMultiLineSchedule(
//   orders: ParsedOrder[],
//   lineConfig: Record<string, number>, // 例: { MAS: 1, DAS: 2, WDA: 2 }
//   personnelConfig: Record<string, number[]>, // 例: { MAS: [33], DAS: [8, 8], WDA: [10, 0] }
//   startTimeConfig: Record<string, number[]> // 例: { MAS: [9], DAS: [9, 10], WDA: [9, 0] }
// ): ScheduledOrder[] {
//   const schedules: ScheduledOrder[] = [];

//   const lineTimes: LineState = {};
//   console.log(lineTimes)
//   for (const dept in lineConfig) {
//     lineTimes[dept] = Array(lineConfig[dept])
//   .fill(0)
//   .map((_, i) => {
//     const startTimes = startTimeConfig[dept];
//     return startTimes && startTimes[i] !== undefined ? startTimes[i] : 9;
//   });
//   }

//   for (const order of orders) {
//     const { department, pieces, productivity } = order;
//     const lines = lineTimes[department];
//     const personList = personnelConfig[department];

//     // 最も早く終わるラインを選ぶ
//     const lineIndex = lines.reduce((minIdx, time, idx, arr) =>
//       time < arr[minIdx] ? idx : minIdx, 0);

//     const start = lines[lineIndex];
//     const people = personList[lineIndex] || 1;
//     const time = (pieces / (productivity * people));
//     const roundedTime = Math.ceil(time / ROUND_UNIT) * ROUND_UNIT;
//     const end = start + roundedTime;

//     schedules.push({
//       ...order,
//       line: lineIndex + 1,
//       start,
//       end,
//     });

//     lineTimes[department][lineIndex] = end;
//   }

//   return schedules;
// }