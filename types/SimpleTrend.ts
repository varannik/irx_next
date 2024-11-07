import { Document } from "mongoose"

export interface I7Days {
    dyn:number,
    rate:number,
}

export interface ITrend {
    pre_days: I7Days[],
    diff_per: number,
}

export interface IAsset {
    [key:string]:ITrend
}

export interface IAssets {
    assets : IAsset
}

export type ISimpleTrend = IAssets & Document
