// 新しい UI 設計と構造に基づく LineScheduleEditor コンポーネント設計案

import { useState } from 'react';

interface LineConfig {
  label: string; // ライン名（例：DAS-1, DAS-2）
  people: number;
  startTime: number;
}

interface DepartmentLineEditorProps {
  department: 'MAS' | 'DAS' | 'WDA';
  initialLines: LineConfig[];
  onChange: (lines: LineConfig[]) => void;
}

export default function DepartmentLineEditor({ department, initialLines, onChange }: DepartmentLineEditorProps) {
  const [lines, setLines] = useState<LineConfig[]>(initialLines);

  const updateLine = (index: number, key: keyof LineConfig, value: number | string) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [key]: value };
    setLines(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-2 border p-2">
      <h3 className="font-bold">{department} 部門 - ライン設定</h3>
      {lines.map((line, index) => (
        <div key={index} className="flex gap-2 items-center">
          <span className="w-16">{line.label}</span>
          <label className="flex flex-col">
            人員
            <input
              type="number"
              value={line.people}
              onChange={(e) => updateLine(index, 'people', Number(e.target.value))}
              className="border w-24"
            />
          </label>
          <label className="flex flex-col">
            開始時間
            <input
              type="number"
              step={0.25}
              value={line.startTime}
              onChange={(e) => updateLine(index, 'startTime', Number(e.target.value))}
              className="border w-24"
            />
          </label>
        </div>
      ))}
    </div>
  );
}