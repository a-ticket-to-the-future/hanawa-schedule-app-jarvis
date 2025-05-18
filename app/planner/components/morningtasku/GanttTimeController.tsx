// components/morningtasku/GanttTimeController.tsx

import React from "react"

interface GanttTimeControllerProps {
  startTime: string
  endTime: string
  onTimeChange: (start: string, end: string) => void
}

const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4)
  const min = (i % 4) * 15
  return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`
})

export default function GanttTimeController({ startTime, endTime, onTimeChange }: GanttTimeControllerProps) {
  return (
    <div className="flex gap-4 items-center mb-4">
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium">開始時刻</label>
        <select
          id="startTime"
          value={startTime}
          onChange={(e) => onTimeChange(e.target.value, endTime)}
          className="border px-2 py-1 rounded"
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="endTime" className="block text-sm font-medium">終了時刻</label>
        <select
          id="endTime"
          value={endTime}
          onChange={(e) => onTimeChange(startTime, e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
