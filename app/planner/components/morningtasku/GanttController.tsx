import React, { useState } from "react"

export default function GanttController({ onRangeChange }: { onRangeChange: (range: { start: number; end: number }) => void }) {
  const [startHour, setStartHour] = useState(9) // 初期値 9:00
  const [endHour, setEndHour] = useState(17)   // 初期値 17:00

  const handleRangeChange = () => {
    if (startHour >= endHour) return // 不正な範囲を弾く
    onRangeChange({ start: startHour, end: endHour })
  }

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">時間範囲の調整</h2>
      <div className="flex gap-4 items-center">
        <label>
          開始時間：
          <input
            type="number"
            min={0}
            max={23}
            value={startHour}
            onChange={(e) => setStartHour(Number(e.target.value))}
            className="border px-2 py-1 rounded ml-2 w-20"
          />
        </label>
        <label>
          終了時間：
          <input
            type="number"
            min={1}
            max={24}
            value={endHour}
            onChange={(e) => setEndHour(Number(e.target.value))}
            className="border px-2 py-1 rounded ml-2 w-20"
          />
        </label>
        <button
          onClick={handleRangeChange}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          反映
        </button>
      </div>

      <div className="flex items-center gap-4">
  <label htmlFor="start">開始時間</label>
  <select value={startHour} onChange={(e) => setStartHour(Number(e.target.value))}>
    {[...Array(24)].map((_, i) => (
      <option key={i} value={i}>{i}:00</option>
    ))}
  </select>
  <label htmlFor="end">終了時間</label>
  <select value={endHour} onChange={(e) => setEndHour(Number(e.target.value))}>
    {[...Array(24)].map((_, i) => (
      <option key={i} value={i}>{i}:00</option>
    ))}
  </select>
</div>
    </div>




  )
}
