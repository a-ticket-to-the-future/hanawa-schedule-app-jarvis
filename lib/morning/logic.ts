// // lib/morning/logic.ts（今後人員割当ロジックを追加予定）

// export const generateAssignment = (absentees: string[]) => {
//     // 欠勤者を除外して、部署ごとの人数バランスなどを決めるロジックへ拡張予定
//     return {
//       WDA: ["佐藤", "田中"],
//       MAS: ["鈴木"],
//       DAS: ["高橋"],
//     }
//   } // 仮データ


// //   // lib/morning/logic.ts（人員割当ロジックを更新）

// // type ProductivityData = {
// //   MAS: number // O列
// //   DAS: number // V列
// //   WDA: number // W列
// // }

// // type Workload = {
// //   MAS: number // 必要ピース数
// //   DAS: number
// //   WDA: number
// // }

// // type AssignmentResult = {
// //   MAS: { requiredTimeHours: number }
// //   DAS: { requiredTimeHours: number }
// //   WDA: { requiredTimeHours: number }
// // }

// // export const generateAssignment = (
// //   workload: Workload,
// //   productivity: ProductivityData
// // ): AssignmentResult => {
// //   return {
// //     MAS: {
// //       requiredTimeHours: workload.MAS / productivity.MAS,
// //     },
// //     DAS: {
// //       requiredTimeHours: workload.DAS / productivity.DAS,
// //     },
// //     WDA: {
// //       requiredTimeHours: workload.WDA / productivity.WDA,
// //     },
// //   }
// // }
// type ProductivityData = {
//   MAS: number
//   DAS: number
//   WDA: number
// }

// type Workload = {
//   MAS: number
//   DAS: number
//   WDA: number
// }

// type PeopleCount = {
//   MAS: number
//   DAS: number
//   WDA: number
// }

// type AssignmentResult = {
//   [key in keyof Workload]: {
//     requiredTotalHours: number
//     people: number
//   }
// }

// export const generateAssignment = (
//   workload: Workload,
//   productivity: ProductivityData,
//   people: PeopleCount
// ): AssignmentResult => {
//   return {
//     MAS: {
//       requiredTotalHours: workload.MAS / productivity.MAS,
//       people: people.MAS,
//     },
//     DAS: {
//       requiredTotalHours: workload.DAS / productivity.DAS,
//       people: people.DAS,
//     },
//     WDA: {
//       requiredTotalHours: workload.WDA / productivity.WDA,
//       people: people.WDA,
//     },
//   }
// }
type ProductivityData = {
  MAS: number
  DAS: number
  WDA: number
}

type Workload = {
  MAS: number
  DAS: number
  WDA: number
}

type PeopleCount = {
  MAS: number
  DAS: number
  WDA: number
}

type AssignmentResult = {
  [key in keyof Workload]: {
    requiredTotalHours: number
    people: number
  }
}

export const generateAssignment = (
  workload: Workload,
  productivity: ProductivityData,
  people: PeopleCount
): AssignmentResult => {
  return {
    MAS: {
      requiredTotalHours: workload.MAS / productivity.MAS,
      people: people.MAS,
    },
    DAS: {
      requiredTotalHours: workload.DAS / productivity.DAS,
      people: people.DAS,
    },
    WDA: {
      requiredTotalHours: workload.WDA / productivity.WDA,
      people: people.WDA,
    },
  }
}
