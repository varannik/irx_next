import { ObjectId } from "mongoose"

export interface IPredict {
    nextdaydate : string
    ,predictedrate: number
    ,actualrate: number
    ,pct_predicted:number
    ,pct_actual:number
    ,csp: boolean
}

interface IPredictUpdate {
    nextdaydate: string; // e.g., "2024-11-19"
    predictedrate: number; // e.g., 67500
    actualrate: number; // e.g., 67300
    pct_predicted: number; // e.g., -0.5
    pct_actual: number; // e.g., -1.0
    csp: boolean; // e.g., true
  }


export interface IUpdateAssetRequest {
    userId: string; // e.g., "67353d808210e1001b74b273"
    assetType: string; // e.g., "US Dollar"
    date: string; // e.g., "2024-11-18"
    newData: IPredictUpdate; // the asset data structure defined above
  }

export interface IDayPredict {
    [key:string]: IPredict
}

export interface IDayPredictAsset {
    [key:string]: IDayPredict[]
}

export interface IUserHistoryPredict {
    userId :string
    ,assets:IDayPredictAsset[]
    ,lastUpdate: string
}

  