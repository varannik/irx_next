export interface IGenIdPrediction {
  [key:string] : number; 
  }

export interface IGenAsset {
    [key:string] : IGenIdPrediction[]
  }

export interface IGenDayPredictions {
    date : string
    ,assets: IGenAsset[]
}