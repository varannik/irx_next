import { Document, ObjectId } from "mongoose"


export interface IUserPredict {
    userId :ObjectId,
    submitDate: Date,
    selectedAsset: string,
    nextDayRate: number
}

export interface IUserForcastRes {
    success: boolean,
    data: IUserPredict[]
  }


export type IUserDailyPredicts = IUserPredict & Document
