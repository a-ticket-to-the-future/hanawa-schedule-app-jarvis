// components/morningtasku/PeopleInput.tsx

import { useState, useEffect } from "react"

export type PeopleData = {
  MAS: number
  DAS: number
  WDA: number
}

type Props = {
  onChange: (data: PeopleData) => void
}

export default function PeopleInput({ onChange }: Props) {
  const [people, setPeople] = useState<PeopleData>({ MAS: 0, DAS: 0, WDA: 0 })

  const handleChange = (dept: keyof PeopleData, value: string) => {
    const num = parseInt(value) || 0
    setPeople((prev) => ({ ...prev, [dept]: num }))
  }

  useEffect(() => {
    onChange(people)
  }, [people, onChange])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">出勤人数の入力</h2>

      {(["MAS", "DAS", "WDA"] as (keyof PeopleData)[]).map((dept) => (
        <div key={dept} className="flex items-center space-x-2">
          <label className="w-16">{dept}</label>
          <input
            type="number"
            value={people[dept]}
            onChange={(e) => handleChange(dept, e.target.value)}
            className="border px-2 py-1 rounded w-24"
            placeholder="人数"
          />
        </div>
      ))}
    </div>
  )
}
