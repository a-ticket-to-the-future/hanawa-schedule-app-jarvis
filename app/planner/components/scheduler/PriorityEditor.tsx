"use client";

import { useEffect } from "react";
import { ParsedOrder } from "@/types/ParsedOrder";

interface Props {
  value: string[];
  onChange: (newOrder: string[]) => void;
  data?: ParsedOrder[];
  setData?: (data: ParsedOrder[]) => void;
}

export default function PriorityEditor({ value, onChange, data, setData }: Props) {
  useEffect(() => {
  if (!Array.isArray(data) || !setData || !Array.isArray(value)) return;

  // 依存配列に data を入れると無限ループになるので、value のみで判定
  setData((prev) => {
    if (!Array.isArray(prev)) return prev;

    const reordered = [...prev].sort((a, b) => {
      const indexA = value.indexOf(a.batch ?? "");
      const indexB = value.indexOf(b.batch ?? "");
      return indexA - indexB;
    });

    return reordered;
  });
}, [value]); // ← 🔴ここを value のみに限定

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