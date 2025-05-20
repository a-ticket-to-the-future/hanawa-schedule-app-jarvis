'use client';

import { useState } from 'react';
import UploadOCR from '@/app/planner/components/ocr/UploadOCR';
import ParsedResultEditor from '@/app/planner/components/editor/ParsedResultEditor';
import ScheduleGrid from '@/app/planner/printable/ScheduleGrid';
import { calculateSchedule } from '@/lib/schedule/calculateSchedule';
import { ParsedOrder } from '@/types/ParsedOrder';

type Department = 'MAS' | 'DAS' | 'WDA';
export default function PlannerPage() {
  const [orders, setOrders] = useState<ParsedOrder[]>([]);

const [personnel, setPersonnel] = useState<Record<Department, number>>({
  MAS: 3,
  DAS: 3,
  WDA: 2,
});

  const scheduled = calculateSchedule(orders, personnel, 9);

  return (
    <main className="space-y-8 p-4">
      <h1 className="text-xl font-bold">スケジュール作成</h1>

      {/* 画像アップロードとOCR */}
      <UploadOCR />

      {/* 編集 UI */}
      <ParsedResultEditor data={orders} onUpdate={setOrders} />

      {/* 人数編集（簡易） */}
      <div className="flex gap-4">
        {(['MAS', 'DAS', 'WDA'] as const).map((dep) => (
          <label key={dep}>
            {dep}
            <input
              type="number"
              value={personnel[dep]}
              onChange={(e) =>
                setPersonnel({ ...personnel, [dep]: Number(e.target.value) })
              }
              className="ml-2 border w-16"
            />
          </label>
))}
      </div>

      {/* ガントチャート */}
      <ScheduleGrid data={scheduled} />
    </main>
  );
}





//↑2025年5月20日改めて構成を調整したもの↑

// "use client";

// import { useState, useEffect } from "react";
// import ExcelUpload from "@/app/planner/components/excel/ExcelUpload";
// import ParsedResultEditor from "@/app/planner/components/ocr/ParsedResultEditor";
// import PriorityEditor from "@/app/planner/components/scheduler/PriorityEditor";
// import GanttChart from "@/app/planner/components/morningtasku/GanttChart";

// import { ParsedOrder } from "@/types/ParsedOrder";
// import { ScheduleEntry } from "@/lib/logic/schedule"
// import { calculateScheduleWithBreaks } from "@/lib/logic/scheduleWithBreaks";

// const DEFAULT_PRIORITY = ["a'", "A当日", "A追加", "AG2", "AG3", "b'", "B当日", "BG2", "BG3"];

// export default function PlannerPage() {
//   const [parsedData, setParsedData] = useState<ParsedOrder[]>([]);
//   const [priority, setPriority] = useState<string[]>(DEFAULT_PRIORITY);
//   const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

//   useEffect(() => {
//   // if (parsedData.length === 0) return;
//   // const schedule = calculateScheduleWithBreaks(parsedData, priority, 9, 17);
//   const scheduleData = calculateScheduleWithBreaks(parsedData, priority, 9, 17);
//   setSchedule(scheduleData);
// }, [parsedData, priority]);

//   return (
//     <main className="p-4 space-y-4">
//       <h1 className="text-xl font-bold">作業予定作成ツール</h1>

//       <ExcelUpload onParsed={setParsedData} />

//       <ParsedResultEditor data={parsedData} setData={setParsedData} />

//       <PriorityEditor
//         value={priority}
//         onChange={setPriority}
//         data={parsedData}
//         setData={setParsedData}
//       />

//       <h2 className="text-lg font-semibold">ガントチャート</h2>
//       <GanttChart data={schedule} />
//     </main>
//   );
// }