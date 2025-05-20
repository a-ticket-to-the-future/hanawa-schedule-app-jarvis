// lib/schedule/calculateSchedule.ts
import { ParsedOrder } from '@/types/ParsedOrder';

export type ScheduledOrder = ParsedOrder & {
  start: number; // 開始時間（例: 9.25）
  end: number;   // 終了時間（例: 10.5）
};

const productivityMap: Record<string, Record<string, number>> = {
  MAS: {
    賞味: 450,
    菓子: 600,
    靴: 210,
    子供肌着: 250,
    ベビー衣料: 250,
    調乳: 330,
    玩具: 235,
    バストイレ: 310,
    靴下: 385,
    パジャマ: 310,
    新生児: 290,
  },
  DAS: {
    男児: 400,
    女児: 400,
    ベビー肌着: 380,
    ベビー衣料: 380,
    菓子: 800,
    MA: 210,
    不定形: 180,
    レインランチ: 230,
  },
  WDA: {
    男児: 120,
    女児: 120,
    前半不定形: 100,
    後半不定形: 85,
  },
};

const BREAK_TIMES = [
  [11.75, 12.5],  // 11:45 - 12:30
  [14.75, 15.0],  // 14:45 - 15:00
  [21.0, 21.25],  // 21:00 - 21:15
];

function adjustForBreaks(start: number, duration: number): number {
  let end = start + duration;
  for (const [bStart, bEnd] of BREAK_TIMES) {
    if (start < bEnd && end > bStart) {
      end += bEnd - bStart;
    }
  }
  return end;
}

export function calculateSchedule(
  orders: ParsedOrder[],
  personnel: { MAS: number; DAS: number; WDA: number },
  baseHour = 9
): ScheduledOrder[] {
  let currentTime = baseHour;
  return orders.map((order) => {
    const { department, batchName, pieces } = order;
    const prod = productivityMap[department]?.[batchName] || 300;
    const headcount = personnel[department] || 1;
    const workTime = pieces / prod / headcount;

    const start = currentTime;
    const end = adjustForBreaks(start, workTime);
    currentTime = end;

    return { ...order, start, end };
  });
}




// // lib/schedule/calculateSchedule.ts
// import { ParsedOrder } from '@/types/ParsedOrder';
// import { productivityMap } from '@/lib/mappings/productivityMap';

// const ROUND_UNIT = 0.25; // 15分単位

// export type ScheduledOrder = ParsedOrder & {
//   start: number; // 例: 9.0 = 9:00
//   end: number;   // 小数表記
// };

// export function calculateSchedule(
//   orders: ParsedOrder[],
//   departmentPersonnel: Record<string, number>,
//   workStartTime = 9
// ): ScheduledOrder[] {
//   let currentTime = workStartTime;
//   const scheduled: ScheduledOrder[] = [];

//   for (const order of orders) {
//     const productivity = productivityMap[order.department]?.[order.batchName] ?? 250;
//     const personnel = departmentPersonnel[order.department] ?? 1;
//     const rawHours = order.pieces / productivity / personnel;

//     const roundedHours = Math.ceil(rawHours / ROUND_UNIT) * ROUND_UNIT;
//     const start = currentTime;
//     const end = start + roundedHours;

//     scheduled.push({ ...order, start, end });
//     currentTime = end;
//   }

//   return scheduled;
// }
