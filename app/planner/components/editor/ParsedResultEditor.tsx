'use client';

import { ParsedOrder } from '@/types/ParsedOrder';
import { FC } from 'react';

interface Props {
  data: ParsedOrder[];
  onUpdate: (data: ParsedOrder[]) => void;
  onAddRow: (department: string) => void;
  onDeleteRow: (index: number) => void;
  personnel: Record<string, number>;
  setPersonnel: (key: string, value: number) => void;
  startTimes: Record<string, number[]>;
  setStartTimes: (dept: string, index: number, value: number) => void;
}

const ParsedResultEditor: FC<Props> = ({ data, onUpdate, onAddRow, onDeleteRow }) => {
  const handleFieldChange = (index: number, field: keyof ParsedOrder, value: string | number) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const moveRow = (index: number, direction: number) => {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= data.length) return;

  const updated = [...data];
  const [moved] = updated.splice(index, 1);
  updated.splice(newIndex, 0, moved);

  onUpdate(updated);
};

  const handleAdd = (dept: string) => {
    onAddRow(dept);
  };

  return (
    <div className="space-y-2">
      <table className="min-w-full text-xs border">
        <thead>
          <tr className="bg-gray-200">
            <th>部門</th>
            <th>パターン</th>
            <th>バッチ名</th>
            <th>アイテム</th>
            <th>ピース</th>
            <th>人数</th>
            <th>生産性</th>
            <th>ライン</th>
            <th>作業時間</th>
            <th>作業順序</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td>
                <input
                  value={entry.department}
                  onChange={(e) => handleFieldChange(index, 'department', e.target.value)}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  value={entry.pattern}
                  onChange={(e) => handleFieldChange(index, 'pattern', e.target.value)}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  value={entry.batchName}
                  onChange={(e) => handleFieldChange(index, 'batchName', e.target.value)}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  value={entry.item}
                  onChange={(e) => handleFieldChange(index, 'item', e.target.value)}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={entry.pieces}
                  onChange={(e) => handleFieldChange(index, 'pieces', Number(e.target.value))}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={entry.people}
                  onChange={(e) => handleFieldChange(index, 'people', Number(e.target.value))}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={entry.productivity}
                  onChange={(e) => handleFieldChange(index, 'productivity', Number(e.target.value))}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={entry.line}
                  onChange={(e) => handleFieldChange(index, 'line', Number(e.target.value))}
                  className="border w-full px-1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={entry.time}
                  onChange={(e) => handleFieldChange(index, 'time', Number(e.target.value))}
                  className="border w-full px-1"
                />
              </td>
              <td className="flex space-x-1">
              <button
                onClick={() => moveRow(index, -1)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                ↑
              </button>
              <button
                onClick={() => moveRow(index, 1)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                ↓
              </button>
            </td>
              <td>
                <button
                  onClick={() => onDeleteRow(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex space-x-2">
        {['MAS', 'DAS', 'WDA'].map((dept) => (
          <button
            key={dept}
            onClick={() => handleAdd(dept)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            {dept}に行を追加
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParsedResultEditor;