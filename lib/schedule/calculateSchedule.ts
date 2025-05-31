// lib/schedule/calculateSchedule.ts
import { ParsedOrder } from '@/types/ParsedOrder';
import { productivityMap } from '@/lib/mappings/productivityMap';

const defaultPersonnel = { MAS: 33, DAS: 16, WDA: 10 };

export function calculateSchedule(
  orders: ParsedOrder[],
  personnel: Record<'MAS' | 'DAS' | 'WDA', number>,
  startHour: number
) {
  let currentTime = {
    MAS: startHour,
    DAS: startHour,
    WDA: startHour,
  };

  return orders.map((order) => {
    const dept = order.department;
    const people = order.people || personnel[dept] || defaultPersonnel[dept];
    const productivity =
      order.productivity ||
      productivityMap?.[dept]?.[order.batchName] ||
      1;
    const pieces = order.pieces || 0;
    const time = +(pieces / (people * productivity)).toFixed(2);

    const start = currentTime[dept];
    const end = +(start + time);
    currentTime[dept] = end;

    return {
      ...order,
      people,
      productivity,
      time,
      start,
      end,
    };
  });
}