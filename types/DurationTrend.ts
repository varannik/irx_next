import { Document } from "mongodb";

// Define the interface for the Trend
export interface Iday {
    date: string;
    rate: number;
}

// Define the interface for the Asset document
export interface IAssetDays {
    asset: string;
    trend: Iday[];
}

export type IAsset = IAssetDays & Document
