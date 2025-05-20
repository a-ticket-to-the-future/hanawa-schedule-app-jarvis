// components/printable/ScheduleGrid.tsx
'use client';
import { ScheduledOrder } from '@/lib/schedule/calculateSchedule';

export default function ScheduleGrid({ data }: { data: ScheduledOrder[] }) {
  const startHour = 9;
  const endHour = 26;
  const totalSlots = (endHour - startHour) * 4; // 15分単位

  return (
    <div className="overflow-x-auto border text-sm">
      <div className="grid" style={{
        gridTemplateColumns: `200px repeat(${totalSlots}, 1fr)`
      }}>
        <div className="font-bold bg-gray-100 p-1 border-r border-b">バッチ名</div>
        {[...Array(totalSlots)].map((_, i) => {
          const h = startHour + Math.floor(i / 4);
          const m = (i % 4) * 15;
          return (
            <div key={i} className="border-b border-r text-center">
              {m === 0 ? `${String(h).padStart(2, '0')}:00` : ''}
            </div>
          );
        })}

        {data.map((entry, row) => {
          const startSlot = Math.round((entry.start - startHour) * 4);
          const endSlot = Math.round((entry.end - startHour) * 4);
          const width = endSlot - startSlot;

          console.log(row)
          console.log(width)

          return (
            <>
              <div className="border-r border-b p-1 bg-gray-50">{entry.batchName}</div>
              {[...Array(totalSlots)].map((_, col) => {
                const inRange = col >= startSlot && col < endSlot;
                const isBreak =
                  (col >= 11 * 4 + 3 && col < 12 * 4 + 2) ||  // 11:45〜12:30
                  (col >= 14 * 4 + 3 && col < 15 * 4) ||      // 14:45〜15:00
                  (col >= 21 * 4 && col < 21 * 4 + 1);        // 21:00〜21:15

                return (
                  <div key={col} className={`border-b border-r h-6 ${
                    isBreak ? 'bg-yellow-100' : inRange ? 'bg-black' : ''
                  }`}></div>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}
