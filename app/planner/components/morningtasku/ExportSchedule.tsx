// ✅ 修正済：ExportSchedule.tsx
import React from "react"

export default function ExportSchedule({ workDate }: { workDate: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">予定表出力</h2>
      <p>出力対象日: {workDate}</p>
      <button className="bg-green-600 text-white px-3 py-1 mt-2 rounded">
        PDFで出力（仮）
      </button>
    </div>
  )
}
