'use client';

import { useEffect, useState } from 'react';
import { ParsedOrder } from '@/types/ParsedOrder';
import { ScheduledOrder } from '@/types/ParsedOrder';
import { calculateMultiLineSchedule } from '@/lib/schedule/calculateMultiLineSchedule';
import ExcelUpload from '@/app/planner/components/excel/ExcelUpload';
import ParsedResultEditor from './components/editor/ParsedResultEditor';
import DepartmentLineEditor from '@/app/planner/components/planner/DepartmentLineEditor';
import ScheduleGrid from '@/app/planner/printable/ScheduleGrid';

export default function PlannerPage() {
  const [parsedOrders, setParsedOrders] = useState<ParsedOrder[]>([]);
  const [personnel, setPersonnel] = useState<Record<string, number>>({
    MAS1: 33,
    DAS1: 8,
    DAS2: 8,
    WDA1: 10,
    WDA2: 0,
  });
  const [startTimes, setStartTimes] = useState<Record<string, number[]>>({
    MAS: [9],
    DAS: [9, 9],
    WDA: [9, 9],
  });
  const [scheduled, setScheduled] = useState<ScheduledOrder[]>([]);

  useEffect(() => {
    const result = calculateMultiLineSchedule(parsedOrders, personnel, startTimes);
    setScheduled(result);
  }, [parsedOrders, personnel, startTimes]);

  // ハンドラー関数に適合した関数を定義
  const handlePersonnelChange = (key: string, value: number) => {
    setPersonnel((prev) => ({ ...prev, [key]: value }));
  };

  const handleStartTimesChange = (dept: string, index: number, value: number) => {
    setStartTimes((prev) => {
      const updated = { ...prev };
      updated[dept] = [...(updated[dept] || [])];
      updated[dept][index] = value;
      return updated;
    });
  };

  return (
    <main className="space-y-6 p-4">
      <ExcelUpload onParsed={setParsedOrders} />
      <ParsedResultEditor
        data={parsedOrders}
        onUpdate={setParsedOrders}
        personnel={personnel}
        setPersonnel={setPersonnel}
        startTimes={startTimes}
        setStartTimes={setStartTimes}
      />
      <DepartmentLineEditor
        personnel={personnel}
        onPersonnelChange={handlePersonnelChange}
        startTimes={startTimes}
        onStartTimesChange={handleStartTimesChange}
      />
      <ScheduleGrid data={scheduled} />
    </main>
  );
}