'use client';

import { ParsedOrder } from '@/types/ParsedOrder';
import { useState, useEffect } from 'react';

export default function ParsedResultEditor({ data, onUpdate }: {
  data: ParsedOrder[];
  onUpdate: (updated: ParsedOrder[]) => void;
}) {
  const [entries, setEntries] = useState<ParsedOrder[]>(data);

  useEffect(() => {
    setEntries(data);
  }, [data]);

  const handleChange = (index: number, key: keyof ParsedOrder, value: string | number) => {
    const updated = [...entries];
    const entry = { ...updated[index], [key]: value };

    // 再計算: 作業時間 = ピース数 / 人数 / 生産性
    const pieces = Number(entry.pieces);
    const people = Number(entry.people);
    const productivity = Number(entry.productivity);
    const time = (pieces && people && productivity) ? +(pieces / (people * productivity)).toFixed(2) : 0;

    updated[index] = { ...entry, time };
    setEntries(updated);
    onUpdate(updated);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border text-xs w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-1">部署</th>
            <th className="border p-1">パターン</th>
            <th className="border p-1">バッチ名</th>
            <th className="border p-1">ピース数</th>
            <th className="border p-1">人数</th>
            <th className="border p-1">生産性</th>
            <th className="border p-1">作業時間</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i} className="border-t">
              <td className="border p-1">{entry.department}</td>
              <td className="border p-1">{entry.pattern}</td>
              <td className="border p-1">{entry.batchName}</td>
              <td className="border p-1">
                <input
                  type="number"
                  value={entry.pieces}
                  onChange={e => handleChange(i, 'pieces', +e.target.value)}
                  className="border w-20 px-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  value={entry.people}
                  onChange={e => handleChange(i, 'people', +e.target.value)}
                  className="border w-16 px-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  value={entry.productivity}
                  onChange={e => handleChange(i, 'productivity', +e.target.value)}
                  className="border w-16 px-1"
                />
              </td>
              <td className="border p-1 text-center">{entry.time?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}