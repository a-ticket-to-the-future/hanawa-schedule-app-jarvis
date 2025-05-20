'use client';

import { ScheduledOrder } from '@/lib/schedule/calculateSchedule';

type Props = {
  data: ScheduledOrder[];
};

export default function ScheduleGrid({ data }: Props) {
  const startHour = 9;
  const endHour = 26;
  const totalSlots = (endHour - startHour) * 4; // 15分単位 → 1時間=4マス

  return (
    <div className="overflow-x-auto border text-sm print:text-xs print:overflow-visible">
      <div className="grid" style={{ gridTemplateColumns: `200px repeat(${totalSlots}, 1fr)` }}>
        {/* 時間ラベル行 */}
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

        {/* 各バッチの作業時間帯を表示 */}
        {data.map((entry, rowIdx) => {
          const startSlot = Math.round((entry.start - startHour) * 4);
          const endSlot = Math.round((entry.end - startHour) * 4);
          const width = endSlot - startSlot;
          console.log(width)
          return (
            <>
              {/* 左側のバッチ名列 */}
              <div className="border-r border-b p-1 bg-gray-50 whitespace-nowrap">
                {entry.department} | {entry.batchName}
              </div>
              {/* 作業スロットのマス */}
              {[...Array(totalSlots)].map((_, colIdx) => {
                const inRange = colIdx >= startSlot && colIdx < endSlot;
                const isBreak =
                  (colIdx >= (11 * 4 + 3) && colIdx < (12 * 4 + 2)) || // 11:45〜12:30
                  (colIdx >= (14 * 4 + 3) && colIdx < (15 * 4)) ||     // 14:45〜15:00
                  (colIdx >= (21 * 4) && colIdx < (21 * 4 + 1));       // 21:00〜21:15

                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`border-b border-r h-6 ${
                      isBreak ? 'bg-yellow-100' : inRange ? 'bg-black' : ''
                    }`}
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