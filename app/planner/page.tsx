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