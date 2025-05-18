"use client";

import { useEffect, useState } from "react";
import {
  calculateWorkTimes,
  WorkTimeResult,
} from "@/lib/logic/calculateWorkTimes";

export default function WorkTimeTable({ data }: { data: Omit<WorkTimeResult, "duration" | "productivity">[] }) {
  const [results, setResults] = useState<WorkTimeResult[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    const fetchData = async () => {
      const computed = await calculateWorkTimes(data, today);
      setResults(computed);
      console.log(computed);
    };

    fetchData();
  }, [data]);

  return (
    <div className="mt-4">
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">部署</th>
            <th className="border px-2 py-1">カテゴリ</th>
            <th className="border px-2 py-1">ピース数</th>
            <th className="border px-2 py-1">人数</th>
            <th className="border px-2 py-1">生産性</th>
            <th className="border px-2 py-1">所要時間 (h)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((entry, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{entry.department}</td>
              <td className="border px-2 py-1">{entry.category}</td>
              <td className="border px-2 py-1 text-right">{entry.pieces}</td>
              <td className="border px-2 py-1 text-right">{entry.people}</td>
              <td className="border px-2 py-1 text-right">{entry.productivity}</td>
              <td className="border px-2 py-1 text-right">
                {entry.duration.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}