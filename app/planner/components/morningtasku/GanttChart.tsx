import { ScheduleEntry } from "@/lib/logic/schedule";



export default function GanttChart({ data }: { data: ScheduleEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">部署</th>
            <th className="border p-2">カテゴリ</th>
            <th className="border p-2">開始</th>
            <th className="border p-2">終了</th>
            <th className="border p-2">バー</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => {
            const start = entry.start;
            const duration = entry.duration;
            const end = start + duration;

            const toTimeStr = (time: number) => {
              const hours = Math.floor(time);
              const minutes = Math.round((time - hours) * 60);
              return `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`;
            };

            return (
              <tr key={idx}>
                <td className="border p-2">{entry.department}</td>
                <td className="border p-2">{entry.category}</td>
                <td className="border p-2">{toTimeStr(start)}</td>
                <td className="border p-2">{toTimeStr(end)}</td>
                <td className="border p-2">
                  <div className="relative h-6 w-full bg-gray-100">
                    <div
                      className="absolute top-0 h-6 bg-blue-500 text-white text-xs text-center"
                      style={{
                        left: `${(start - 9) * 100}px`,
                        width: `${duration * 100}px`,
                      }}
                    >
                      {toTimeStr(start)}〜{toTimeStr(end)}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}



// "use client";

// import { ScheduleEntry } from "@/lib/logic/schedule";

// type Props = {
//   data: ScheduleEntry[];
// };

// export default function GanttChart({ data }: Props) {
//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold">スケジュール</h3>
//       <table className="table-auto w-full border mt-2">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">部署</th>
//             <th className="border px-2 py-1">カテゴリ</th>
//             <th className="border px-2 py-1">開始 (時刻)</th>
//             <th className="border px-2 py-1">終了 (時刻)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((entry, idx) => (
//             <tr key={idx}>
//               <td className="border px-2 py-1">{entry.department}</td>
//               <td className="border px-2 py-1">{entry.category}</td>
//               <td className="border px-2 py-1 text-right">{entry.start}</td>
//               <td className="border px-2 py-1 text-right">
//                 {Number(entry.start + entry.duration).toFixed(2)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// // import React from "react";

// // export type ScheduleEntry = {
// //   department: string;
// //   category: string;
// //   start: number; // 0.25単位（例: 9:00 = 0, 9:15 = 0.25, 9:30 = 0.5）
// //   duration: number; // 単位: 0.25（例: 1.5h = 6）
// // };

// // type Props = {
// //   data: ScheduleEntry[];
// // };

// // const hours = Array.from({ length: 33 }, (_, i) => 9 + i * 0.25); // 9:00 から 17:00 + α まで

// // function formatTime(value: number) {
// //   const hour = Math.floor(value);
// //   const minute = (value - hour) * 60;
// //   return `${hour}:${minute.toString().padStart(2, "0")}`;
// // }

// // export default function GanttChart({ data }: Props) {
// //   const departments = [...new Set(data.map((d) => d.department))];

// //   console.log(departments)

// //   return (
// //     <div className="overflow-x-auto border rounded">
// //       <table className="table-auto border-collapse w-full">
// //         <thead>
// //           <tr>
// //             <th className="border p-1 w-32 text-left">部署</th>
// //             <th className="border p-1 w-32 text-left">カテゴリ</th>
// //             {hours.map((h, i) => (
// //               <th key={i} className="border px-1 text-xs text-gray-600 min-w-[30px]">
// //                 {formatTime(h)}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map((entry, idx) => {
// //             const emptyStart = entry.start / 0.25;
// //             const blockSpan = entry.duration / 0.25;

// //             return (
// //               <tr key={idx}>
// //                 <td className="border px-1 text-sm whitespace-nowrap">{entry.department}</td>
// //                 <td className="border px-1 text-sm whitespace-nowrap">{entry.category}</td>
// //                 {Array.from({ length: hours.length }).map((_, i) => {
// //                   if (i < emptyStart || i >= emptyStart + blockSpan) {
// //                     return <td key={i} className="border h-5 min-w-[20px]" />;
// //                   }
// //                   if (i === emptyStart) {
// //                     return (
// //                       <td
// //                         key={i}
// //                         colSpan={blockSpan}
// //                         className="bg-black h-5 min-w-[20px]"
// //                       />
// //                     );
// //                   }
// //                   return null;
// //                 })}
// //               </tr>
// //             );
// //           })}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }
