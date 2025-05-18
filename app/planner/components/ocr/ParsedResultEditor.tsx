// "use client";

// import { WorkEntry } from "@/types/WorkEntry";
// import { useEffect } from "react";

// type Props = {
//   data: WorkEntry[];
//   setData: React.Dispatch<React.SetStateAction<WorkEntry[]>>;
// };

// export default function ParsedResultEditor({ data, setData }: Props) {
//   const handleChange = (
//     idx: number,
//     field: keyof WorkEntry,
//     value: string | number
//   ) => {
//     const updated = [...data];
//     if (field === "pieces" || field === "people" || field === "productivity") {
//       updated[idx][field] = Number(value);
//     } else {
//       updated[idx][field] = value as string;
//     }
//     setData(updated);
//   };

//   useEffect(() => {
//     console.log("編集データ:", data);
//   }, [data]);

//   return (
//     <div className="mt-4">
//       <h2 className="text-lg font-semibold mb-2">読み取り結果の編集</h2>
//       <table className="table-auto w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">部署</th>
//             <th className="border px-2 py-1">カテゴリ</th>
//             <th className="border px-2 py-1">ピース数</th>
//             <th className="border px-2 py-1">人数</th>
//             <th className="border px-2 py-1">生産性</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((entry, idx) => (
//             <tr key={idx}>
//               <td className="border px-2 py-1">
//                 <input
//                   type="text"
//                   value={entry.department}
//                   onChange={(e) =>
//                     handleChange(idx, "department", e.target.value)
//                   }
//                   className="w-full border rounded px-1"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <input
//                   type="text"
//                   value={entry.category}
//                   onChange={(e) =>
//                     handleChange(idx, "category", e.target.value)
//                   }
//                   className="w-full border rounded px-1"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <input
//                   type="number"
//                   value={entry.pieces}
//                   onChange={(e) => handleChange(idx, "pieces", e.target.value)}
//                   className="w-full border rounded px-1 text-right"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <input
//                   type="number"
//                   value={entry.people}
//                   onChange={(e) => handleChange(idx, "people", e.target.value)}
//                   className="w-full border rounded px-1 text-right"
//                 />
//               </td>
//               <td className="border px-2 py-1">
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={entry.productivity}
//                   onChange={(e) =>
//                     handleChange(idx, "productivity", e.target.value)
//                   }
//                   className="w-full border rounded px-1 text-right"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { ParsedOrder } from "@/types/ParsedOrder";

type Props = {
  data: ParsedOrder[];
  setData: (data: ParsedOrder[]) => void;
};

export default function ParsedResultEditor({ data, setData }: Props) {
  const handleChange = (index: number, field: keyof ParsedOrder, value: string | number) => {
    const updated = [...data];
    
    updated[index][field] = field === "pieces" ? Number(value) : value;
    setData(updated);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">編集テーブル</h3>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">カテゴリ</th>
            <th className="border px-2 py-1">ピース数</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">
                <input
                  className="w-full border rounded px-1"
                  value={entry.category}
                  onChange={(e) => handleChange(idx, "category", e.target.value)}
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  className="w-full border rounded px-1 text-right"
                  type="number"
                  value={entry.pieces}
                  onChange={(e) => handleChange(idx, "pieces", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}