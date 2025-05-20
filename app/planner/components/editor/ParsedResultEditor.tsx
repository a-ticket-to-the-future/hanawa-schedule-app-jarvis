// components/editor/ParsedResultEditor.tsx
'use client';
import { ParsedOrder } from '@/types/ParsedOrder';
import { useEffect, useState } from 'react';

export default function ParsedResultEditor({ data, onUpdate }: {
  data: ParsedOrder[];
  onUpdate: (updated: ParsedOrder[]) => void;
}) {
  const [entries, setEntries] = useState<ParsedOrder[]>([]);

  useEffect(() => {
    setEntries(data);
  }, [data]);

  const handleChange = (i: number, key: keyof ParsedOrder, value: string | number) => {
    const updated = [...entries];
    updated[i] = { ...updated[i], [key]: value };
    setEntries(updated);
    onUpdate(updated);
  };

  const move = (from: number, to: number) => {
    const updated = [...entries];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setEntries(updated);
    onUpdate(updated);
  };

  return (
    <table className="table-auto w-full text-sm border">
      <thead>
        <tr>
          <th>日付</th><th>部署</th><th>パターン</th><th>バッチ名</th><th>ピース数</th><th>操作</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, i) => (
          <tr key={i} className="border-t">
            <td>{entry.date}</td>
            <td><input value={entry.department} onChange={e => handleChange(i, 'department', e.target.value)} className="border" /></td>
            <td><input value={entry.pattern} onChange={e => handleChange(i, 'pattern', e.target.value)} className="border" /></td>
            <td><input value={entry.batchName} onChange={e => handleChange(i, 'batchName', e.target.value)} className="border" /></td>
            <td><input type="number" value={entry.pieces} onChange={e => handleChange(i, 'pieces', +e.target.value)} className="border w-24" /></td>
            <td>
              <button onClick={() => move(i, i - 1)} disabled={i === 0}>↑</button>
              <button onClick={() => move(i, i + 1)} disabled={i === entries.length - 1}>↓</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



//↓一応、エラーなかった

// // components/editor/ParsedResultEditor.tsx
// 'use client';
// import { ParsedOrder } from '@/types/ParsedOrder';
// import { useState } from 'react';

// export default function ParsedResultEditor({ data, onUpdate }: {
//   data: ParsedOrder[];
//   onUpdate: (updated: ParsedOrder[]) => void;
// }) {
//   const [entries, setEntries] = useState(data);

//   const handleChange = (i: number, key: keyof ParsedOrder, value: string | number) => {
//     const updated = [...entries];
//     updated[i] = { ...updated[i], [key]: value };
//     setEntries(updated);
//     onUpdate(updated);
//   };

//   const move = (from: number, to: number) => {
//     const updated = [...entries];
//     const [moved] = updated.splice(from, 1);
//     updated.splice(to, 0, moved);
//     setEntries(updated);
//     onUpdate(updated);
//   };

//   return (
//     <table className="table-auto w-full text-sm border">
//       <thead>
//         <tr>
//           <th>日付</th><th>部署</th><th>パターン</th><th>バッチ名</th><th>ピース数</th><th>操作</th>
//         </tr>
//       </thead>
//       <tbody>
//         {entries.map((entry, i) => (
//           <tr key={i} className="border-t">
//             <td>{entry.date}</td>
//             <td><input value={entry.department} onChange={e => handleChange(i, 'department', e.target.value)} className="border" /></td>
//             <td><input value={entry.pattern} onChange={e => handleChange(i, 'pattern', e.target.value)} className="border" /></td>
//             <td><input value={entry.batchName} onChange={e => handleChange(i, 'batchName', e.target.value)} className="border" /></td>
//             <td><input type="number" value={entry.pieces} onChange={e => handleChange(i, 'pieces', +e.target.value)} className="border w-24" /></td>
//             <td>
//               <button onClick={() => move(i, i - 1)} disabled={i === 0}>↑</button>
//               <button onClick={() => move(i, i + 1)} disabled={i === entries.length - 1}>↓</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
