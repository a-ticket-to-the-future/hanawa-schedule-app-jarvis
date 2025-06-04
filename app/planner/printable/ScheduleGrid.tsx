'use client';

import { ScheduledOrder } from '@/types/ParsedOrder';
import { FC } from 'react';

interface Props {
  data: ScheduledOrder[];
  showDowntime: boolean;
}

const startHour = 9;
const endHour = 26;
const totalSlots = (endHour - startHour) * 4;

const breakSlots = [
  { start: (11 - startHour) * 4 + 3, end: (12 - startHour) * 4 + 2 }, // 11:45〜12:30
  { start: (14 - startHour) * 4 + 3, end: (15 - startHour) * 4 },     // 14:45〜15:00
  { start: (21 - startHour) * 4, end: (21 - startHour) * 4 + 1 },     // 21:00〜21:15
];

const downtimeSlots = [
  { start: (17 - startHour) * 4, end: (18 - startHour) * 4 }, // 17:00〜18:00
];

function isBreak(slot: number): boolean {
  return breakSlots.some(b => slot >= b.start && slot < b.end);
}

function isDowntime(slot: number, show: boolean): boolean {
  return show && downtimeSlots.some(b => slot >= b.start && slot < b.end);
}

const ScheduleGrid: FC<Props> = ({ data, showDowntime }) => {
  return (
    <div className="overflow-x-auto text-xs border">
      <div className="grid" style={{ gridTemplateColumns: `180px repeat(${totalSlots}, 1fr) 60px` }}>
        <div className="font-bold bg-gray-200 p-1 border-r border-b">作業区分</div>
        {[...Array(totalSlots)].map((_, i) => {
          const h = startHour + Math.floor(i / 4);
          const m = (i % 4) * 15;
          return (
            <div key={i} className="border-r border-b text-center bg-gray-100">
              {m === 0 ? `${String(h).padStart(2, '0')}:00` : ''}
            </div>
          );
        })}
        <div className="font-bold bg-gray-200 p-1 border-b text-center">人数</div>

        {data.map((entry, idx) => {
          const label = `${entry.department}${entry.line !== undefined ? entry.line + 1 : ''} / ${entry.batchName} / ${entry.pattern}`;
          const start = Math.floor((entry.start - startHour) * 4);
          const end = Math.floor((entry.end - startHour) * 4);
          const rowColor = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';

          return (
            <div key={`row-${idx}`} className="contents">
              <div className={`border-r border-b p-1 font-medium ${rowColor}`}>{label}</div>
              {[...Array(totalSlots)].map((_, col) => {
                const inRange = col >= start && col < end;
                const bgColor = isBreak(col)
                  ? 'bg-yellow-100'
                  : isDowntime(col, showDowntime)
                  ? 'bg-red-200'
                  : inRange
                  ? 'bg-black'
                  : rowColor;
                const labelText = isBreak(col)
                  ? col === breakSlots[0].start ? '昼' : col === breakSlots[1].start ? '休' : col === breakSlots[2].start ? '憩' : ''
                  : isDowntime(col, showDowntime) && col === downtimeSlots[0].start
                  ? '停止'
                  : '';
                return (
                  <div
                    key={`cell-${idx}-${col}`}
                    className={`border-r border-b h-6 ${bgColor} flex items-center justify-center`}
                  >
                    {labelText}
                  </div>
                );
              })}
              <div className="border-b text-center">{entry.personnel ?? ''}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleGrid;