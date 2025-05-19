"use client";

import { useEffect } from "react";
import { ParsedOrder } from "@/types/ParsedOrder";

interface PriorityEditorProps {
  value: string[];
  onChange: (newOrder: string[]) => void;
  data?: ParsedOrder[];
  setData?: (data: ParsedOrder[]) => void;
}

export default function PriorityEditor({ value, onChange, data, setData }: PriorityEditorProps) {
  useEffect(() => {
    if (!Array.isArray(data) || !setData) return;

    const reordered = [...data].sort((a, b) => {
      const indexA = value.indexOf(a.batch ?? "");
      const indexB = value.indexOf(b.batch ?? "");
      return indexA - indexB;
    });

    setData(reordered);
  }, [value]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const newOrder = [...value];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    onChange(newOrder);
  };

  const unique = [...new Set(value)];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">バッチ優先順位の編集</h2>
      <ul>
        {unique.map((item, index) => (
          <li key={item} className="flex items-center space-x-2">
            <span className="flex-1">{item}</span>
            <button onClick={() => move(index, index - 1)}>↑</button>
            <button onClick={() => move(index, index + 1)}>↓</button>
          </li>
        ))}
      </ul>
    </div>
  );
}