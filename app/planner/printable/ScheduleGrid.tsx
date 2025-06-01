
'use client';

import { ScheduledOrder } from '@/lib/schedule/calculateMultiLineSchedule';
import React from 'react';

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
  const groupedByLine = data.reduce((acc, entry) => {
    const key = `${entry.department}-${entry.line}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {} as Record<string, ScheduledOrder[]>);

  const rowKeys = Object.keys(groupedByLine);

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

        {/* 各ラインごとに描画 */}
        {rowKeys.map((key, idx) => {
          const entries = groupedByLine[key];
          return entries.map((entry, i) => {
            const label = `${entry.department}-${entry.line} / ${entry.batchName} / ${entry.pattern}`;
            const start = Math.round((entry.start - startHour) * 4);
            const end = Math.round((entry.end - startHour) * 4);
            const rowColor = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';

            return (
              <React.Fragment key={`row-${key}-${i}`}>
                <div className={`border-r border-b p-1 font-medium ${rowColor}`}>{label}</div>
                {[...Array(totalSlots)].map((_, col) => {
                  const inRange = col >= start && col < end;
                  const bgColor = isBreak(col)
                    ? 'bg-yellow-100'
                    : inRange
                      ? 'bg-black'
                      : rowColor;
                  return (
                    <div
                      key={`cell-${key}-${i}-${col}`}
                      className={`border-r border-b h-6 ${bgColor}`}
                    />
                  );
                })}
              </React.Fragment>
            );
          });
        })}
      </div>
    </div>
  );
}



// // app/planner/printable/ScheduleGrid.tsx
// 'use client';

// import { ScheduledOrder } from '@/lib/schedule/calculateSchedule';
// import React from 'react';

// interface Props {
//   data: ScheduledOrder[];
// }

// const startHour = 9;
// const endHour = 26;
// const totalSlots = (endHour - startHour) * 4; // 15分単位

// const breakSlots = [
//   { start: 11 * 4 + 3, end: 12 * 4 + 2 },  // 11:45〜12:30
//   { start: 14 * 4 + 3, end: 15 * 4 },      // 14:45〜15:00
//   { start: 21 * 4, end: 21 * 4 + 1 },      // 21:00〜21:15
// ];

// function isBreak(slot: number): boolean {
//   return breakSlots.some(b => slot >= b.start && slot < b.end);
// }

// export default function ScheduleGrid({ data }: Props) {
//   const grouped = data.reduce<Record<string, ScheduledOrder[]>>((acc, item) => {
//     if (!acc[item.department]) acc[item.department] = [];
//     acc[item.department].push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="overflow-x-auto text-xs border">
//       <div className="grid" style={{ gridTemplateColumns: `180px repeat(${totalSlots}, 1fr)` }}>

//         {/* 時間ヘッダ */}
//         <div className="font-bold bg-gray-200 p-1 border-r border-b">作業区分</div>
//         {[...Array(totalSlots)].map((_, i) => {
//           const h = startHour + Math.floor(i / 4);
//           const m = (i % 4) * 15;
//           return (
//             <div key={i} className="border-r border-b text-center">
//               {m === 0 ? `${String(h).padStart(2, '0')}:00` : ''}
//             </div>
//           );
//         })}

//         {/* 各部署ごとの3段構成 */}
//         {(['MAS', 'DAS', 'WDA'] as const).map((dept) => (
//           grouped[dept]?.map((entry, idx) => {
//             const start = Math.round((entry.start - startHour) * 4);
//             const end = Math.round((entry.end - startHour) * 4);
//             const rowColor = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
//             const lineKey = `${dept}-${idx}`;

//             return (
//               <React.Fragment key={lineKey}>
//                 {[entry.department, entry.batchName, entry.pattern].map((label, i) => (
//                   <div
//                     key={`${lineKey}-label-${i}`}
//                     className={`border-r border-b p-1 font-medium ${rowColor}`}
//                   >
//                     {label}
//                   </div>
//                 ))}
//                 {[...Array(3)].flatMap((_, rowOffset) => (
//                   [...Array(totalSlots)].map((_, col) => {
//                     const inRange = col >= start && col < end;
//                     const bgColor = isBreak(col)
//                       ? 'bg-yellow-100'
//                       : inRange
//                       ? 'bg-black'
//                       : rowColor;
//                     return (
//                       <div
//                         key={`${lineKey}-${rowOffset}-${col}`}
//                         className={`border-r border-b h-6 ${bgColor}`}
//                       />
//                     );
//                   })
//                 ))}
//               </React.Fragment>
//             );
//           })
//         ))}
//       </div>
//     </div>
//   );
// }