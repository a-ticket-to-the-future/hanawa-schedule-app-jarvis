// もしこのファイル内で定義するなら
// export type ParsedOrder = {
//   category: string 
//   pieces: number 
//   department:string
//   people: number 
//   productivity : number
//   batch : string
// };
export type ParsedOrder = {
  date: string;
  department: "MAS" | "DAS" | "WDA";
  batchName: string;
  pieces: number;
  pattern: "a'" | "A当日" | "A追加" | "b'" | "B当日";
};