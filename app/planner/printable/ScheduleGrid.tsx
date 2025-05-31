// app/planner/printable/ScheduleGrid.tsx
'use client';

import { ScheduledOrder } from '@/lib/schedule/calculateSchedule';

interface Props {
  data: ScheduledOrder[];
}

const startHour = 9;
const endHour = 26;
const totalSlots = (endHour - startHour) * 4; // 15分単位

const breakSlots = [
  { start: 11 * 4 + 3, end: 12 * 4 + 2 },  // 11:45〜12:30
  { start: 14 * 4 + 3, end: 15 * 4 },      // 14:45〜15:00
  { start: 21 * 4, end: 21 * 4 + 1 },      // 21:00〜21:15
];

function isBreak(slot: number): boolean {
  return breakSlots.some(b => slot >= b.start && slot < b.end);
}

export default function ScheduleGrid({ data }: Props) {
  return (
    <div className="overflow-x-auto text-xs border">
      <div className="grid" style={{ gridTemplateColumns: `180px repeat(${totalSlots}, 1fr)` }}>

        {/* 時間ヘッダ */}
        <div className="font-bold bg-gray-200 p-1 border-r border-b">作業区分</div>
        {[...Array(totalSlots)].map((_, i) => {
          const h = startHour + Math.floor(i / 4);
          const m = (i % 4) * 15;
          return (
            <div key={i} className="border-r border-b text-center">
              {m === 0 ? `${String(h).padStart(2, '0')}:00` : ''}
            </div>
          );
        })}

        {/* 各行 */}
        {data.map((entry, idx) => {
          const label = `${entry.department} / ${entry.batchName} / ${entry.pattern}`;
          const start = Math.round((entry.start - startHour) * 4);
          const end = Math.round((entry.end - startHour) * 4);
          const rowColor = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
          console.log(data)
          return (
            <>
              <div className={`border-r border-b p-1 font-medium ${rowColor}`}>{label}</div>
              {[...Array(totalSlots)].map((_, i) => {
                const inRange = i >= start && i < end;
                return (
                  <div
                    key={`${idx}-${i}`}
                    className={`border-r border-b h-6 ${isBreak(i) ? 'bg-yellow-100' : inRange ? 'bg-black' : rowColor}`}
                  ></div>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}
