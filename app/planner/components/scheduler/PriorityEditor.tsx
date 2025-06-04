// components/scheduler/PriorityEditor.tsx
'use client';

import React from 'react';

interface Props {
  department: string;
  value?: string[];  // optional にして undefined ガード
  onChange: (updated: string[]) => void;
}

export default function PriorityEditor({ department, value = [], onChange }: Props) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const updated = [...value];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold">{department} バッチ優先順位の編集</h2>
      <ul>
        {value.map((item, index) => (
          <li key={item} className="flex items-center space-x-2 my-1">
            <span className="flex-1">{item}</span>
            <button onClick={() => move(index, index - 1)}>↑</button>
            <button onClick={() => move(index, index + 1)}>↓</button>
          </li>
        ))}
      </ul>
    </div>
  );
}