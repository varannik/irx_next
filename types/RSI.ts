import { Document } from "mongoose";

// Define the RSI data schema for each currency
export interface IRSIEntry {
    date: string;
    RSI: number;
}

// Define the main RSI schema
export interface IRSIAsset   {
    rsi: {
        [key:string]:IRSIEntry[]
    };
}

export type IRSIModel = IRSIAsset & Document