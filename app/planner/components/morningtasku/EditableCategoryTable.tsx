"use client";

import { useState } from "react";

export type OCRData = {
  department: string;
  rawCategory: string;
  normalizedCategory: string;
  pieces: number;
};

type Props = {
  data: OCRData[];
  onUpdate: (updated: OCRData[]) => void;
};

export default function EditableCategoryTable({ data, onUpdate }: Props) {
  const [rows, setRows] = useState(data);

  const handleChange = (index: number, key: keyof OCRData, value: string | number) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [key]: value };
    setRows(newRows);
    onUpdate(newRows);
  };

  return (
    <table className="table-auto w-full text-sm border border-collapse">
      <thead>
        <tr>
          <th className="border px-2 py-1">部署</th>
          <th className="border px-2 py-1">元カテゴリ名</th>
          <th className="border px-2 py-1">変換後カテゴリ名</th>
          <th className="border px-2 py-1">ピース数</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="border px-2 py-1">{row.department}</td>
            <td className="border px-2 py-1">{row.rawCategory}</td>
            <td className="border px-2 py-1">
              <input
                className="border rounded px-1 w-full"
                value={row.normalizedCategory}
                onChange={(e) => handleChange(i, "normalizedCategory", e.target.value)}
              />
            </td>
            <td className="border px-2 py-1">
              <input
                type="number"
                className="border rounded px-1 w-20"
                value={row.pieces}
                onChange={(e) => handleChange(i, "pieces", parseInt(e.target.value) || 0)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
