import { Document } from "mongoose";

export interface IDayMaxMin { max: number, min: number }

export interface IDaysMaxMin {
  [key:number] : IDayMaxMin
}

export interface IAssetRange {
  week: IDayMaxMin,
  month: IDayMaxMin,
  today: IDayMaxMin,
  days: IDaysMaxMin
}

export interface ICalAsset {
  [key:string]:IAssetRange
}

export interface IMaxMinCal   {
    maxmin: {
      [key:string]:ICalAsset
    };
  }

export type IMaxMin = IMaxMinCal & Document