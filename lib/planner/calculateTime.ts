type Entry = {
  department: "MAS" | "DAS" | "WDA"
  category: string
  pieces: number
}

type ProductivityMap = {
  MAS: number
  DAS: number
  WDA: number
}

type PeopleMap = {
  MAS: number
  DAS: number
  WDA: number
}

type Output = {
  department: string
  category: string
  pieces: number
  productivity: number
  people: number
  hours: number
}

export function calculateWorkTime(
  entries: Entry[],
  productivityMap: ProductivityMap,
  peopleMap: PeopleMap
): Output[] {
  return entries.map((entry) => {
    const productivity = productivityMap[entry.department]
    const people = peopleMap[entry.department]
    const hours = productivity > 0 && people > 0
      ? entry.pieces / (productivity * people)
      : 0

    return {
      ...entry,
      productivity,
      people,
      hours: Math.round(hours * 100) / 100 // 小数第2位まで
    }
  })
}