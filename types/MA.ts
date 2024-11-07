import { Document } from "mongoose";

// Define the interface for each currency record
export interface ICurrencyRecord  {
    date: string;
    Rate: number;
    MA3: number;
    MA5: number;
    MA10: number;
    MA50: number;
    MA100: number;
    MA200: number;
    MA300: number;
}

// Define the interface for the main schema
export interface IMATrend  {
    ma: {
        [key: string]: ICurrencyRecord[];
    };
}

export type IMAModel = IMATrend &  Document