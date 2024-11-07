import { Document } from "mongoose";

interface IPrice {
    buy: number;
    sell: number;
  }


export interface IAssetCurrentRate {
    currentrate: Record<string, {
      price: IPrice;
    }>;
    last_update: Date;
  }

export type ICurrentRate = IAssetCurrentRate & Document