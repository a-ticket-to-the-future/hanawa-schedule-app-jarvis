// ✅ 修正済：AssignmentPreview.tsx
import React from "react"

export default function AssignmentPreview({ people }: { people: number }) {
  const workload = { MAS: 12000, DAS: 8000, WDA: 10000 }
  const totalWorkload = Object.values(workload).reduce((a, b) => a + b, 0)
  const estimatedHours = people > 0 ? (totalWorkload / people / 60).toFixed(2) : "-"

  return (
    <div>
      <h2 className="text-lg font-semibold">稼働予定</h2>
      <p>出勤人数: {people}人</p>
      <p>総作業量: {totalWorkload}ピース</p>
      <p>1人あたり作業時間: {estimatedHours} 時間</p>
    </div>
  )
}
