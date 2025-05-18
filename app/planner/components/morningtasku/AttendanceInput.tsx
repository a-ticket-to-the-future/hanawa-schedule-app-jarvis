import React from "react"

type Props = {
  onChange: (num: number) => void
}

export default function AttendanceInput({ onChange }: Props) {
  const [count, setCount] = React.useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setCount(value)
    onChange(value)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">出勤人数の入力</h2>
      <input
        type="number"
        value={count}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
        placeholder="人数を入力"
      />
    </div>
  )
}