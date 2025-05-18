import {batchNameMap} from "@/data/batchNameMap.json"

type RawEntry = { rawName: string; pieces: number; department: "MAS" | "DAS" | "WDA" }
type ProductivityMap = { [department: string]: number }

export function processTasks(
  entries: RawEntry[],
  productivity: ProductivityMap,
  peoplePerDept: { [dept: string]: number }
) {
  return entries.map(entry => {
    const category = batchNameMap[entry.rawName] || entry.rawName // 正規化
    const people = peoplePerDept[entry.department] || 1
    const product = productivity[entry.department] || 1
    const time = entry.pieces / people / product // 時間[h]
    const blocks = Math.ceil(time * 4) // 15分単位に分割（0.25h刻み）

    return {
      category,
      department: entry.department,
      pieces: entry.pieces,
      time,
      blocks
    }
  })
}