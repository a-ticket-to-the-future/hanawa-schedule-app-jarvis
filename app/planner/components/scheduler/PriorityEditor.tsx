"use client";

import { useEffect } from "react";
import { ParsedOrder } from "@/types/ParsedOrder";

interface Props {
  value: string[];
  onChange: (newOrder: string[]) => void;
  data?: ParsedOrder[];
  setData?: React.Dispatch<React.SetStateAction<ParsedOrder[]>>;
}

export default function PriorityEditor({ value, onChange, data, setData }: Props) {
  useEffect(() => {
    if (!Array.isArray(data) || !setData || !Array.isArray(value)) return;

    setData((prev: ParsedOrder[]) => {
      if (!Array.isArray(prev)) return prev;

      const reordered = [...prev].sort((a, b) => {
        const indexA = value.indexOf(a.batchName ?? "");
        const indexB = value.indexOf(b.batchName ?? "");
        return indexA - indexB;
      });
      
      return reordered;
    });
  }, [value, data, setData]); // ← 🔵 依存配列に明示的に追加

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const newOrder = [...value];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    onChange(newOrder);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">バッチ優先順位の編集</h2>
      <ul>
        {value.map((item, index) => (
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