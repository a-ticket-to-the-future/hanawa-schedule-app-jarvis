import { useState } from "react"

export default function AbsenceInput() {
  const [absences, setAbsences] = useState<string[]>([])
  const [name, setName] = useState("")

  const handleAdd = () => {
    if (name.trim()) {
      setAbsences([...absences, name.trim()])
      setName("")
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">欠勤者入力</h2>
      <div className="flex items-center space-x-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前を入力"
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          追加
        </button>
      </div>
      <ul className="mt-2 list-disc list-inside">
        {absences.map((person, idx) => (
          <li key={idx}>{person}</li>
        ))}
      </ul>
    </div>
  )
}
