import React from "react";

export type ScheduleEntry = {
  department: string;
  category: string;
  start: number; // 0.25単位（例: 9:00 = 0, 9:15 = 0.25, 9:30 = 0.5）
  duration: number; // 単位: 0.25（例: 1.5h = 6）
};

type Props = {
  data: ScheduleEntry[];
};

const hours = Array.from({ length: 33 }, (_, i) => 9 + i * 0.25); // 9:00 から 17:00 + α まで

function formatTime(value: number) {
  const hour = Math.floor(value);
  const minute = (value - hour) * 60;
  return `${hour}:${minute.toString().padStart(2, "0")}`;
}

export default function GanttChart({ data }: Props) {
  const departments = [...new Set(data.map((d) => d.department))];

  console.log(departments)

  return (
    <div className="overflow-x-auto border rounded">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-1 w-32 text-left">部署</th>
            <th className="border p-1 w-32 text-left">カテゴリ</th>
            {hours.map((h, i) => (
              <th key={i} className="border px-1 text-xs text-gray-600 min-w-[30px]">
                {formatTime(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => {
            const emptyStart = entry.start / 0.25;
            const blockSpan = entry.duration / 0.25;

            return (
              <tr key={idx}>
                <td className="border px-1 text-sm whitespace-nowrap">{entry.department}</td>
                <td className="border px-1 text-sm whitespace-nowrap">{entry.category}</td>
                {Array.from({ length: hours.length }).map((_, i) => {
                  if (i < emptyStart || i >= emptyStart + blockSpan) {
                    return <td key={i} className="border h-5 min-w-[20px]" />;
                  }
                  if (i === emptyStart) {
                    return (
                      <td
                        key={i}
                        colSpan={blockSpan}
                        className="bg-black h-5 min-w-[20px]"
                      />
                    );
                  }
                  return null;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
