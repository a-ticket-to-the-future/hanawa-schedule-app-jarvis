import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import WorkTimeTable from "./WorkTimeTable"

export default function PrintButton() {
  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <div className="space-y-4">
      <div ref={componentRef}>
        <WorkTimeTable />
      </div>
      <button
        onClick={handlePrint}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        📄 印刷する
      </button>
    </div>
  )
}