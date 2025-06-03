'use client';

import React, { useEffect } from 'react';
import { Input } from '@/app/planner/components/ui/input';
import { ParsedOrder } from '@/types/ParsedOrder';

interface Props {
  data: ParsedOrder[];
  onUpdate: (data: ParsedOrder[]) => void;
  personnel: Record<string, number>;
  setPersonnel: (key: string, value: number) => void;
  startTimes: Record<string, number[]>;
  setStartTimes: (dept: string, index: number, value: number) => void;
}

export default  function ParsedResultEditor({ data, onUpdate, personnel, setPersonnel, startTimes, setStartTimes }: Props) {
  useEffect(  () => {
    const updated = data.map((entry) => {
      const people = entry.people ?? 0;
      const productivity = entry.productivity ?? 0;
      const pieces = entry.pieces ?? 0;
      if (people > 0 && productivity > 0) {
        const time = pieces / (people * productivity);
        return { ...entry, time };
      }
      return { ...entry, time: 0 };
    });
    onUpdate(updated);
  }, []);
  console.log(personnel,setPersonnel,startTimes,setStartTimes)

  const handleChange = (index: number, field: keyof ParsedOrder, value: string | number) => {
    const updated = [...data];
    if (field === 'pieces' || field === 'people' || field === 'productivity' || field === 'line') {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = String(value);
    }
    onUpdate(updated);
  };

  const moveRow = (fromIndex: number, toIndex: number) => {
    const updated = [...data];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onUpdate(updated);
  };

  return (
    <table className="w-full table-fixed border border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-1">部門</th>
          <th className="border px-1">パターン</th>
          <th className="border px-1">バッチ名</th>
          <th className="border px-1">ピース数</th>
          <th className="border px-1">人数</th>
          <th className="border px-1">生産性</th>
          <th className="border px-1">ライン</th>
          <th className="border px-1">作業時間</th>
          <th className="border px-1">並び替え</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, i) => (
          <tr key={i}>
            <td className="border px-1">
              <Input value={entry.department ?? ''} onChange={(e) => handleChange(i, 'department', e.target.value)} className="w-20" />
            </td>
            <td className="border px-1">
              <Input value={entry.pattern ?? ''} onChange={(e) => handleChange(i, 'pattern', e.target.value)} className="w-20" />
            </td>
            <td className="border px-1">
              <Input value={entry.batchName ?? ''} onChange={(e) => handleChange(i, 'batchName', e.target.value)} className="w-32" />
            </td>
            <td className="border px-1">
              <Input type="number" value={entry.pieces ?? ''} onChange={(e) => handleChange(i, 'pieces', e.target.value)} className="w-20" />
            </td>
            <td className="border px-1">
              <Input type="number" value={entry.people ?? ''} onChange={(e) => handleChange(i, 'people', e.target.value)} className="w-16" />
            </td>
            <td className="border px-1">
              <Input type="number" value={entry.productivity ?? ''} onChange={(e) => handleChange(i, 'productivity', e.target.value)} className="w-16" />
            </td>
            <td className="border px-1">
              <Input type="number" value={entry.line ?? 0} onChange={(e) => handleChange(i, 'line', e.target.value)} className="w-12" min={0} />
            </td>
            <td className="border px-1 text-center">{entry.time?.toFixed(2)}</td>
            <td className="border px-1 text-center">
              <div className="flex flex-col space-y-1">
                <button onClick={() => moveRow(i, i - 1)} disabled={i === 0} className="text-xs">⬆︎</button>
                <button onClick={() => moveRow(i, i + 1)} disabled={i === data.length - 1} className="text-xs">⬇︎</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}