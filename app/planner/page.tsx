// "use client";

// import { useState } from "react";
// import UploadOCR from "@/app/planner/components/morningtasku/UploadOCR";
// import ParsedResultEditor from "@/app/planner/components/ocr/ParsedResultEditor";
// import GanttChart from "@/app/planner/components/morningtasku/GanttChart";
// import { calculateScheduleEntries } from "@/lib/logic/calculateScheduleEntries";
// import { WorkEntry } from "@/types/WorkEntry";
// import { ScheduleEntry } from "@/lib/logic/calculateWorkTimes";

// export default function PlannerPage() {
//   const [workData, setWorkData] = useState<WorkEntry[]>([]);
//   const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

//   const handleParsed = (parsed: WorkEntry[]) => {
//     console.log(parsed)
//     setWorkData(parsed);
//     const scheduleData = calculateScheduleEntries(parsed, 9, 17);
//     setSchedule(scheduleData);
//   };

//   return (
//     <main className="p-4 space-y-4">
//       <h1 className="text-xl font-bold">作業予定作成ツール</h1>
//       <UploadOCR onParsed={handleParsed} />
//       <ParsedResultEditor data={workData} setData={setWorkData} />
//       <h2 className="text-lg font-semibold">ガントチャート</h2>
//       <GanttChart data={schedule} />
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import ImageUpload from "@/app/planner/components/ocr/ImageUpload";
import ParsedResultEditor from "@/app/planner/components/ocr/ParsedResultEditor";
import { ParsedOrder } from "@/types/ParsedOrder";

export default function PlannerPage() {
  const [parsedData, setParsedData] = useState<ParsedOrder[]>([]);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-bold">作業予定作成ツール</h1>
      <ImageUpload onParsed={setParsedData} />
      <ParsedResultEditor data={parsedData} setData={setParsedData} />
    </main>
  );
}