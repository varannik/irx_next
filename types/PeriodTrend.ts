import { Document } from "mongodb"

export interface IDataItem {
    date: string
    rate: number
  }

export interface IDataList {
  week:IDataItem[],
  month:IDataItem[],
  quarter:IDataItem[],
}

export interface IAssetData {
  [key:string]:IDataList
}

export interface ICalAsset {

    periods:{
      [key:string]:IAssetData
    }
}

export type IPeriodicTrend = ICalAsset & Document