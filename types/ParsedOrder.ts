// types/ParsedOrder.ts
export type Department = 'MAS' | 'DAS' | 'WDA';
export type Pattern = "a'" | 'A当日' | 'A追加' | "b'" | 'B当日';

export type ParsedOrder = {
  date: string;
  department: Department;
  pattern: Pattern;
  batchName: string;
  pieces: number;
  people: number; // 各バッチに対して個別に人員設定
  productivity: number; // バッチに紐づく生産性
  category: string; // カテゴリ（バッチ名から正規化）
  time?: number; // 作業時間（計算結果）
  personnel:number
};