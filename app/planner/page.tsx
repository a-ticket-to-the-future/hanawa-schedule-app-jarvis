"use client";

import { useState } from "react";
import UploadExcel from "@/app/planner/components/excel/ExcelUpload";
import ParsedResultEditor from "@/app/planner/components/editor/ParsedResultEditor";
import ScheduleGrid from "@/app/planner/printable/ScheduleGrid";
import { calculateMultiLineSchedule } from "@/lib/schedule/calculateMultiLineSchedule";
import { saveSchedule } from "@/lib/db/saveSchedule";
import { fetchSchedule } from "@/lib/db/fetchSchedule";
import { ParsedOrder } from "@/types/ParsedOrder";

export default function PlannerPage() {
  const [orders, setOrders] = useState<ParsedOrder[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const [startTimes, setStartTimes] = useState({
    MAS: [9],
    DAS: [9, 9],
    WDA: [9],
  });

  const [personnel, setPersonnel] = useState({
    MAS: [33],
    DAS: [8, 8],
    WDA: [10],
  });

  // 各部門のライン数を定義（例：DAS = 2ライン）
const lineConfig = {
  MAS: 1,
  DAS: 2,
  WDA: 2,
};

  

  

  const scheduled = calculateMultiLineSchedule(orders, lineConfig, startTimes);
  console.log(lineConfig)

  // const scheduled = calculateMultiLineSchedule(orders, startTimes, personnel);

  const handleSave = async () => {
    const result = await saveSchedule(date, orders);
    console.log(result);
    alert("保存完了");
  };

  const handleLoad = async () => {
    const loaded = await fetchSchedule(date);
    if (loaded) setOrders(loaded);
    else alert("データが見つかりません");
  };

  return (
    <main className="space-y-6 p-4">
      <h1 className="text-xl font-bold">スケジュール作成</h1>

      <div className="flex gap-4 items-center">
        <label>
          日付:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="ml-2 border px-2"
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          保存
        </button>
        <button
          onClick={handleLoad}
          className="bg-gray-500 text-white px-4 py-1 rounded"
        >
          読込
        </button>
      </div>

      <UploadExcel onParsed={setOrders} />

      <ParsedResultEditor data={orders} onUpdate={setOrders} />

      <div className="flex gap-4">
        {(["MAS", "DAS", "WDA"] as const).map((dept) => (
          <div key={dept} className="space-y-2">
            <div className="font-bold">{dept}</div>
            {personnel[dept].map((p, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <label>人員{idx + 1}</label>
                <input
                  type="number"
                  value={p}
                  onChange={(e) => {
                    const updated = [...personnel[dept]];
                    updated[idx] = Number(e.target.value);
                    setPersonnel({ ...personnel, [dept]: updated });
                  }}
                  className="border px-2 w-20"
                />
                <label>開始</label>
                <input
                  type="number"
                  step={0.25}
                  value={startTimes[dept][idx]}
                  onChange={(e) => {
                    const updated = [...startTimes[dept]];
                    updated[idx] = Number(e.target.value);
                    setStartTimes({ ...startTimes, [dept]: updated });
                  }}
                  className="border px-2 w-20"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <ScheduleGrid data={scheduled} />
    </main>
  );
}





// 'use client';

// import { useState } from 'react';
// import UploadExcel from '@/app/planner/components/excel/ExcelUpload';
// import ParsedResultEditor from '@/app/planner/components/editor/ParsedResultEditor';
// import ScheduleGrid from '@/app/planner/printable/ScheduleGrid';
// import { calculateSchedule } from '@/lib/schedule/calculateSchedule';
// import { saveSchedule } from '@/lib/db/saveSchedule';
// import { fetchSchedule } from '@/lib/db/fetchSchedule';
// import { ParsedOrder } from '@/types/ParsedOrder';

// export default function PlannerPage() {
//   const [orders, setOrders] = useState<ParsedOrder[]>([]);
//   const [personnel, setPersonnel] = useState({ MAS: 33, DAS: 16, WDA: 10 });
//   const [startTimes, setStartTimes] = useState({ MAS: 9, DAS: 9, WDA: 9 });
//   const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

//   const scheduled = calculateSchedule(orders, personnel);

//   const handleSave = async () => {
//     const result = await saveSchedule(date, orders);
//     console.log(result);
//     alert('保存完了');
//   };

//   const handleLoad = async () => {
//     const loaded = await fetchSchedule(date);
//     if (loaded) setOrders(loaded);
//     else alert('データが見つかりません');
//   };

//   return (
//     <main className="space-y-6 p-4">
//       <h1 className="text-xl font-bold">スケジュール作成</h1>

//       <div className="flex gap-4 items-center">
//         <label>日付:
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="ml-2 border px-2"
//           />
//         </label>
//         <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded">保存</button>
//         <button onClick={handleLoad} className="bg-gray-500 text-white px-4 py-1 rounded">読込</button>
//       </div>

//       <UploadExcel onParsed={setOrders} />

//       <ParsedResultEditor data={orders} onUpdate={setOrders} />

//       <div className="flex flex-col gap-4">
//         <div className="flex gap-4">
//           {(['MAS', 'DAS', 'WDA'] as const).map((dep) => (
//             <label key={dep} className="flex flex-col">
//               {dep}人員
//               <input
//                 type="number"
//                 value={personnel[dep]}
//                 onChange={(e) => setPersonnel({ ...personnel, [dep]: Number(e.target.value) })}
//                 className="border w-24"
//               />
//             </label>
//           ))}
//         </div>
//         <div className="flex gap-4">
//           {(['MAS', 'DAS', 'WDA'] as const).map((dep) => (
//             <label key={dep} className="flex flex-col">
//               {dep}開始時間
//               <input
//                 type="number"
//                 step={0.25}
//                 value={startTimes[dep]}
//                 onChange={(e) => setStartTimes({ ...startTimes, [dep]: Number(e.target.value) })}
//                 className="border w-24"
//               />
//             </label>
//           ))}
//         </div>
//       </div>

//       <ScheduleGrid data={scheduled} />
//     </main>
//   );
// }
