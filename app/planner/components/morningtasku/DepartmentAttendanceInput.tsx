type Department = "MAS" | "DAS" | "WDA"

type Props = {
  department: Department
  value: number
  onChange: (department: Department, value: number) => void
}

export default function DepartmentAttendanceInput({ department, value, onChange }: Props) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">
        {department} 出勤人数
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(department, parseInt(e.target.value || "0"))}
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  )
}