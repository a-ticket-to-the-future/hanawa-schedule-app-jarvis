import React, { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import GanttController from "@/components/morningtasku/GanttController"

export default function PrintSchedule({ scheduleData }: { scheduleData: any }) {
  const componentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "作業予定表",
  })

  return (
    <div className="space-y-4">
      <button
        onClick={handlePrint}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        📄 予定表を印刷
      </button>
      <div ref={componentRef} className="print-area border p-4 bg-white">
        <GanttController data={scheduleData} />
      </div>
    </div>
  )
}
