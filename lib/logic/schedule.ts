// export type ScheduleEntry = {
//   department: string | number;
//   category: string | number;
//   start:  number;
//   end: string | number;
//   duration: number;
//   pieces: string |number; 
//   people:  string |number; 
//   productivity: number;
//   batch: string ;
  


// };



export type ScheduleEntry = {
  department: 'MAS' | 'DAS' | 'WDA';
  batchName: string;
  pieces: number;
  personnel: number;
  productivity: number; // pcs/h
  startTime: number; // 小数表記 例: 9.5
  endTime: number;   // 小数表記
  category:string
};