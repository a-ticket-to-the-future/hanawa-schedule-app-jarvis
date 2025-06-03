'use client';

import { ScheduledOrder } from '@/types/ParsedOrder';
import { FC } from 'react';

interface Props {
  data: ScheduledOrder[];
}

const startHour = 9;
const endHour = 26;
const totalSlots = (endHour - startHour) * 4;

const breakSlots = [
  { start: 11 * 4 + 3, end: 12 * 4 + 2 }, // 11:45〜12:30
  { start: 14 * 4 + 3, end: 15 * 4 },     // 14:45〜15:00
  { start: 21 * 4, end: 21 * 4 + 1 },     // 21:00〜21:15
];

function isBreak(slot: number): boolean {
  return breakSlots.some(b => slot >= b.start && slot < b.end);
}

const ScheduleGrid: FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto text-xs border">
      <div className="grid" style={{ gridTemplateColumns: `180px repeat(${totalSlots}, 1fr)` }}>
        {/* ヘッダー */}
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

        {/* 行描画 */}
        {data.map((entry, idx) => {
          const label = `${entry.department}${entry.line !== undefined ? entry.line + 1 : ''} / ${entry.batchName} / ${entry.pattern}`;
          const start = Math.round((entry.start - startHour) * 4);
          const end = Math.round((entry.end - startHour) * 4);
          const rowColor = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';

          return (
            <div key={`row-${idx}`} className="contents">
              {/* ラベル列 */}
              <div className={`border-r border-b p-1 font-medium ${rowColor}`}>
                {label}
              </div>
              {/* 時間スロット */}
              {[...Array(totalSlots)].map((_, col) => {
                const inRange = col >= start && col < end;
                const bgColor = isBreak(col)
                  ? 'bg-yellow-100'
                  : inRange
                  ? 'bg-black'
                  : rowColor;
                return (
                  <div
                    key={`cell-${idx}-${col}`}
                    className={`border-r border-b h-6 ${bgColor}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleGrid;



// // app/planner/components/scheduler/ScheduleGrid.tsx
// "use client";

// import { ScheduledOrder } from "@/lib/schedule/calculateMultiLineSchedule";
// import React from "react";

// interface Props {
//   data: ScheduledOrder[];
// }

// const startHour = 9;
// const endHour = 26;
// const totalSlots = (endHour - startHour) * 4; // 15分単位

// const breakSlots = [
//   { start: 11 * 4 + 3, end: 12 * 4 + 2 }, // 11:45〜12:30
//   { start: 14 * 4 + 3, end: 15 * 4 }, // 14:45〜15:00
//   { start: 21 * 4, end: 21 * 4 + 1 }, // 21:00〜21:15
// ];

// function isBreak(slot: number): boolean {
//   return breakSlots.some((b) => slot >= b.start && slot < b.end);
// }

// export default function ScheduleGrid({ data }: Props) {
//   return (
//     <div className="overflow-x-auto text-xs border">
//       <div
//         className="grid"
//         style={{ gridTemplateColumns: `180px repeat(${totalSlots}, 1fr)` }}
//       >
//         <div className="font-bold bg-gray-200 p-1 border-r border-b">作業区分</div>
//         {[...Array(totalSlots)].map((_, i) => {
//           const h = startHour + Math.floor(i / 4);
//           const m = (i % 4) * 15;
//           return (
//             <div key={i} className="border-r border-b text-center">
//               {m === 0 ? `${String(h).padStart(2, "0")}:00` : ""}
//             </div>
//           );
//         })}

//         {data.map((entry, idx) => {
//           const label = `${entry.department}${entry.line !== undefined ? `-${entry.line + 1}` : ""} / ${entry.batchName} / ${entry.pattern}`;
//           const start = Math.round((entry.start - startHour) * 4);
//           const end = Math.round((entry.end - startHour) * 4);
//           const rowColor = idx % 2 === 0 ? "bg-white" : "bg-gray-50";

//           return (
//             <React.Fragment key={`row-${idx}`}>
//               <div
//                 className={`border-r border-b p-1 font-medium ${rowColor}`}
//               >
//                 {label}
//               </div>
//               {[...Array(totalSlots)].map((_, col) => {
//                 const inRange = col >= start && col < end;
//                 const bgColor = isBreak(col)
//                   ? "bg-yellow-100"
//                   : inRange
//                   ? "bg-black"
//                   : rowColor;
//                 return (
//                   <div
//                     key={`cell-${idx}-${col}`}
//                     className={`border-r border-b h-6 ${bgColor}`}
//                   />
//                 );
//               })}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// }