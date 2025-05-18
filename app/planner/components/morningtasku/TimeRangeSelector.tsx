import { useState } from "react"
import { Label } from "@/app/planner/components/ui/label"
import { Input } from "@/app/planner/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const hours = Array.from({ length: 24 }, (_, i) => i)

export default function TimeRangeSelector({ startHour, endHour, onChange }: {
  startHour: number
  endHour: number
  onChange: (start: number, end: number) => void
}) {
  const [mode, setMode] = useState<'select' | 'slider'>('select')
  const [start, setStart] = useState(startHour)
  const [end, setEnd] = useState(endHour)

  const handleStartChange = (val: string) => {
    const hour = parseInt(val)
    setStart(hour)
    onChange(hour, end)
  }

  const handleEndChange = (val: string) => {
    const hour = parseInt(val)
    setEnd(hour)
    onChange(start, hour)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const val = parseInt(e.target.value)
    if (type === 'start') {
      setStart(val)
      onChange(val, end)
    } else {
      setEnd(val)
      onChange(start, val)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">時間範囲設定</Label>
        <div className="flex items-center space-x-2">
          <span className="text-sm">セレクト</span>
          <Switch checked={mode === 'slider'} onCheckedChange={(v) => setMode(v ? 'slider' : 'select')} />
          <span className="text-sm">スライダー</span>
        </div>
      </div>

      {mode === 'select' ? (
        <div className="flex space-x-4">
          <div>
            <Label>開始時間</Label>
            <Select onValueChange={handleStartChange} defaultValue={String(start)}>
              <SelectTrigger>
                <SelectValue placeholder="開始時間" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={String(h)}>
                    {h}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>終了時間</Label>
            <Select onValueChange={handleEndChange} defaultValue={String(end)}>
              <SelectTrigger>
                <SelectValue placeholder="終了時間" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={String(h)}>
                    {h}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label>開始時間: {start}:00</Label>
            <Input type="range" min="0" max="23" value={start} onChange={(e) => handleSliderChange(e, 'start')} />
          </div>
          <div>
            <Label>終了時間: {end}:00</Label>
            <Input type="range" min="0" max="23" value={end} onChange={(e) => handleSliderChange(e, 'end')} />
          </div>
        </div>
      )}
    </div>
  )
}
