// ✅ 修正済：pages/morning/index.tsx
import { useState } from "react"
import AttendanceInput from "@/app/planner/components/morningtasku/AttendanceInput"
import AssignmentPreview from "@/app/planner/components/morningtasku/AssignmentPreview"
import ExportSchedule from "@/app/planner/components/morningtasku/ExportSchedule"
import PrintButton from "@/app/planner/components/morningtasku/PrintButton"
import PrintWorkTimeTable from "@/app/planner/components/morningtasku/PrintWorkTimeTable"
import WorkTimeTable from "@/app/planner/components/morningtasku/WorkTimeTable"


export default function MorningPage() {
  const [people, setPeople] = useState(0)
  const today = new Date().toISOString().split("T")[0]

  const mockWorkData = [
  { department: "MAS", category: "賞味期限", start: "09:00", end: "10:15" },
  { department: "MAS", category: "ベビー衣料", start: "10:30", end: "11:45" },
  { department: "DAS", category: "子供肌着", start: "09:00", end: "10:00" },
  { department: "WDA", category: "女児", start: "10:15", end: "11:30" },
]

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">朝の予定表</h1>
      <AttendanceInput onChange={setPeople} />
      <AssignmentPreview people={people} />
      <ExportSchedule workDate={today} />
      <PrintButton />
      <PrintWorkTimeTable />

      <WorkTimeTable data={mockWorkData} />
    </main>
  )
}
