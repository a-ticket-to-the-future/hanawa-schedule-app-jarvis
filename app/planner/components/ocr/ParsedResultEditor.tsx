"use client";

import { ParsedOrder } from "@/types/ParsedOrder";

type Props = {
  data: ParsedOrder[];
  setData: React.Dispatch<React.SetStateAction<ParsedOrder[]>>;
};

export default function ParsedResultEditor({ data, setData }: Props) {
  const handleChange = (
    index: number,
    field: keyof ParsedOrder,
    value: string | number
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: field === "pieces" ? Number(value) : value,
    };
    setData(updated);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">解析結果編集</h2>
      <table className="table-auto w-full border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">部署</th>
            <th className="border px-2 py-1">カテゴリ</th>
            <th className="border px-2 py-1">ピース数</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={entry.department}
                  onChange={(e) => handleChange(idx, "department", e.target.value)}
                  className="w-full border"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={entry.category}
                  onChange={(e) => handleChange(idx, "category", e.target.value)}
                  className="w-full border"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={entry.pieces}
                  onChange={(e) => handleChange(idx, "pieces", e.target.value)}
                  className="w-full border text-right"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}