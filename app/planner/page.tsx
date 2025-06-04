'use client';

import { useEffect, useState } from 'react';
import {
  ParsedOrder,
  ScheduledOrder,
  Department,
  Pattern,
} from '@/types/ParsedOrder';
import { calculateMultiLineSchedule } from '@/lib/schedule/calculateMultiLineSchedule';
import ExcelUpload from '@/app/planner/components/input/UploadExcel';
import ParsedResultEditor from './components/editor/ParsedResultEditor';
import DepartmentLineEditor from '@/app/planner/components/planner/DepartmentLineEditor';
import ScheduleGrid from '@/app/planner/printable/ScheduleGrid';
// import PriorityEditor from '@/app/planner/components/scheduler/PriorityEditor';
import { useMemo } from 'react';

export default function PlannerPage() {
  const [parsedOrders, setParsedOrders] = useState<ParsedOrder[]>([]);
  const [personnel, setPersonnel] = useState<Record<string, number>>({});
  const [startTimes, setStartTimes] = useState<Record<string, number[]>>({});
  const [scheduled, setScheduled] = useState<ScheduledOrder[]>([]);
  // const [priorityMap, setPriorityMap] = useState<Record<string, string[]>>({});
  const [showDowntime, setShowDowntime] = useState(false);

  useEffect(() => {
    const result = calculateMultiLineSchedule(
      parsedOrders,
      personnel,
      startTimes,
      // priorityMap,
      {},
      showDowntime
    );
    setScheduled(result);
  }, [parsedOrders, personnel, startTimes, showDowntime]);
  console.log(showDowntime)

  const handleAddRow = (department: string) => {
    const newRow: ParsedOrder = {
      department: department as Department,
      pattern: '' as Pattern,
      batchName: '',
      item: 0,
      pieces: 0,
      line: 0,
      manuallyAdded: true,
      people: 1,
      productivity: 1,
      category: '',
      date: '',
    };
    setParsedOrders((prev) => [...prev, newRow]);
  };

  const onDeleteRow = (index: number) => {
    setParsedOrders((prev) => prev.filter((_, i) => i !== index));
  };

  

// 中略...

const departmentTotals = useMemo(() => {
  const totals: Record<string, number> = { MAS: 0, DAS: 0, WDA: 0 };
  for (const entry of scheduled) {
    if (totals[entry.department] !== undefined) {
      totals[entry.department] += entry.time ?? 0;
    }
  }
  return totals;
}, [scheduled]);

const overallTotal = useMemo(() => {
  return scheduled.reduce((sum, entry) => sum + (entry.time ?? 0), 0);
}, [scheduled]);

  return (
    <main className="space-y-6 p-4">
      <ExcelUpload onParsed={setParsedOrders} />
      <ParsedResultEditor
        data={parsedOrders}
        onUpdate={setParsedOrders}
        onAddRow={handleAddRow}
        onDeleteRow={onDeleteRow}
        personnel={personnel}
        setPersonnel={(key: string, value: number) =>
          setPersonnel((prev) => ({ ...prev, [key]: value }))
          
        }
        startTimes={startTimes}
        setStartTimes={(dept: string, index: number, value: number) => {
          const updated = [...(startTimes[dept] || [])];
          updated[index] = value;
          setStartTimes((prev) => ({ ...prev, [dept]: updated }));
        }}
      />

      <DepartmentLineEditor
        personnel={personnel}
        onPersonnelChange={(key: string, value: number) =>
          setPersonnel((prev) => ({ ...prev, [key]: value }))
        }
        startTimes={startTimes}
        onStartTimesChange={(dept: string, index: number, value: number) => {
          const updated = [...(startTimes[dept] || [])];
          updated[index] = value;
          setStartTimes((prev) => ({ ...prev, [dept]: updated }));
        }}
      />

      <main className="space-y-6 p-4">
  {/* ...他のコンポーネント */}

  {/* {(['MAS', 'DAS', 'WDA'] as const).map((dept) => (
    // 
  ))} */}
  {/* <PriorityEditor
      key={dept}
      department={dept}
      value={priorityMap[dept] ?? []}
      onChange={(updated) =>
        setPriorityMap((prev) => ({ ...prev, [dept]: updated }))
      }
    /> */}

  {/* ...他のコンポーネント */}
</main>
<div className="space-y-2 text-sm font-medium">
  <div>🟦 <strong>MAS 合計作業時間:</strong> {departmentTotals.MAS.toFixed(2)} 時間</div>
  <div>🟩 <strong>DAS 合計作業時間:</strong> {departmentTotals.DAS.toFixed(2)} 時間</div>
  <div>🟧 <strong>WDA 合計作業時間:</strong> {departmentTotals.WDA.toFixed(2)} 時間</div>
  <div className="mt-2 text-base">🟥 <strong>全体合計:</strong> {overallTotal.toFixed(2)} 時間</div>
</div>

      <button
        onClick={() => setShowDowntime((prev) => !prev)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        {showDowntime ? '17:00〜18:00稼働停止解除' : '17:00〜18:00稼働停止'}
      </button>

      <ScheduleGrid data={scheduled} showDowntime={showDowntime} />
    </main>
  );
}